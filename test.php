<?php
// Include the main TCPDF library (search for installation path).
require_once('tcpdf/tcpdf.php');

function resizeimg($imgsrc,$w,$h){
	$imgdata = getimagesize($imgsrc);
	$res_img = imagecreatetruecolor($w,$h);
	$src_img = imagecreatefromjpeg($imgsrc);
	imagecopyresampled($res_img, $src_img, 0, 0, 0, 0, $w, $h, $imgdata[0], $imgdata[1]);
	return $res_img;
}
function textwrap($arr){
	$res = $arr[0];
	for($i=1;$i<count($arr);$i++){
		$res = $res."\n".$arr[$i];
	}
	return $res;
}
$dstUrl = json_decode($_POST['dst_url'], true);
$json = json_decode($_POST['src_url'], true);
$info = json_decode($_POST['con_info'], true);
$o_pos = json_decode($_POST['img_pos'], true);
$font = json_decode($_POST['font_info'], true);
for($i=0;$i<count($dstUrl);$i++){
	$dst_img = imagecreatefromjpeg($dstUrl[$i]);
	for($j=0;$j<count($json[$i]);$j++){
		if($json[$i][$j] != "undefined"){
			imagecopy($dst_img, resizeimg($json[$i][$j],$o_pos[$i][$j]['width'],$o_pos[$i][$j]['height']), $info[$i][$j]['left'], $info[$i][$j]['top'], $o_pos[$i][$j]['left'], $o_pos[$i][$j]['top'], $info[$i][$j]['width']-1, $info[$i][$j]['height']-1);
		}
	}
	for($k=0;$k<count($font[$i]);$k++){
		$font_color = imagecolorallocate($dst_img, $font[$i][$k]['color'][0], $font[$i][$k]['color'][1], $font[$i][$k]['color'][2]);
		imagettftext($dst_img, $font[$i][$k]['size'], 0, $font[$i][$k]['left'], $font[$i][$k]['top'], $font_color, $font[$i][$k]['file'], textwrap($font[$i][$k]['text']));
	}
	imagejpeg($dst_img,'files/save' . $i . '.jpg');
	imagedestroy($dst_img);
}

$pdf = new TCPDF('L', PDF_UNIT, 'A3', true, 'UTF-8', false);

//set margins
$pdf->SetMargins(10, 35, 10);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

$pdf->setPrintHeader(false);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

for($i=0;$i<count($dstUrl);$i++){
	// add a page
	$pdf->AddPage();
	// set JPEG quality
	$pdf->setJPEGQuality(100);
	if($i == 1 || $i == count($dstUrl) - 1){
		$pdf->Image('files/save' . $i . '.jpg', '', '', 200, 200, 'JPG', '', '', true, 300, '', false, false, 0, false, false, false);
	}
	else {
		$pdf->Image('files/save' . $i . '.jpg', '', '', 400, 200, 'JPG', '', '', true, 300, '', false, false, 0, false, false, false);
	}
}

//output PDF document
$pdf->Output('files/exp_001.pdf', 'F');
?>