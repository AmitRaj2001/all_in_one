import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./ImageEditor.css";

const ImageEditor = () => {
	const [image, setImage] = useState(null);
	const [editor, setEditor] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);

	const handleDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		setImage(file);
	};

	const handleUpload = async () => {
		if (!editor || !image) return;

		const canvas = editor.getImageScaledToCanvas();
		const blob = await new Promise((resolve) => canvas.toBlob(resolve));

		const formData = new FormData();
		formData.append("image", blob);

		const response = await axios.post(
			"https://api.remove.bg/v1.0/AmitRaj",
			formData,
			{
				headers: {
                    "X-Api-Key": 'UyEDAe4EYgVCRn82qrp7cNGS', 
				},
			}
		);

		setCroppedImage(response.data.data.result_url);
	};

	const handleAspectRatioChange = (ratio) => {
		// Handle aspect ratio change here
	};

	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = croppedImage;
		link.download = "cropped_image.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div>
			<Dropzone onDrop={handleDrop}>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps({ className: "dropzone" })}>
						<input {...getInputProps()} />
						<p>Drag & drop an image here, or click to select one</p>
					</div>
				)}
			</Dropzone>

			{image && (
				<div>
					<div>
						<button onClick={() => handleAspectRatioChange(1)}>
							1:1
						</button>
						<button onClick={() => handleAspectRatioChange(3 / 4)}>
							3:4
						</button>
						<button onClick={() => handleAspectRatioChange(9 / 16)}>
							9:16
						</button>
					</div>
					<AvatarEditor
						ref={setEditor}
						image={image}
						width={250}
						height={250}
						border={50}
						color={[255, 255, 255, 0.6]} // RGBA
						scale={1}
						rotate={0}
						borderRadius={0}
						disableDrop={true}
						onPositionChange={() => {}} // Required even if empty
						onImageReady={() => {}} // Required even if empty
						onImageChange={() => {}} // Required even if empty
					/>
					<button onClick={handleUpload}>Remove Background</button>
					{croppedImage && (
						<button onClick={handleDownload}>
							Download Cropped Image
						</button>
					)}
					{croppedImage && <img src={croppedImage} alt="Cropped" />}
				</div>
			)}
		</div>
	);
};

export default ImageEditor;
