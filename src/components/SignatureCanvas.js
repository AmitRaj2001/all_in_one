import React, { Component } from "react";
import './SignatureCanvas.css';

class SignatureCanvas extends Component {
	componentDidMount() {
		let isDrawing = false;
		let lastX = 0;
		let lastY = 0;

		const colorPicker = document.getElementById("colorPicker");
		const canvasColor = document.getElementById("canvasColor");
		const canvas = document.getElementById("myCanvas");
		const clearButton = document.getElementById("clearButton");
		const saveButton = document.getElementById("saveButton");
		const fontSizePicker = document.getElementById("fontSizePicker");
		const ctx = canvas.getContext("2d");

		colorPicker.addEventListener("change", (event) => {
			ctx.fillStyle = event.target.value;
			ctx.strokeStyle = event.target.value;
		});

		canvasColor.addEventListener("change", (event) => {
			ctx.fillStyle = event.target.value;
			ctx.fillRect(0, 0, 800, 500);
		});

		canvas.addEventListener("mousedown", (event) => {
			isDrawing = true;
			lastX = event.offsetX;
			lastY = event.offsetY;
		});

		canvas.addEventListener("mousemove", (event) => {
			if (isDrawing) {
				ctx.beginPath();
				ctx.moveTo(lastX, lastY);
				ctx.lineTo(event.offsetX, event.offsetY);
				ctx.stroke();

				lastX = event.offsetX;
				lastY = event.offsetY;
			}
		});

		canvas.addEventListener("contextmenu", (event) => {
			event.preventDefault();
		});

		canvas.addEventListener("mouseup", () => {
			isDrawing = false;
		});

		fontSizePicker.addEventListener("change", (event) => {
			ctx.lineWidth = event.target.value;
		});

		clearButton.addEventListener("click", () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		});

		saveButton.addEventListener("click", () => {
			localStorage.setItem("canvasContents", canvas.toDataURL());
			let link = document.createElement("a");
			link.download = "my-canvas.png";
			link.href = canvas.toDataURL();
			link.click();
		});

		document
			.getElementById("retrieveButton")
			.addEventListener("click", () => {
				let savedCanvas = localStorage.getItem("canvasContents");
				if (savedCanvas) {
					let img = new Image();
					img.src = savedCanvas;
					img.onload = () => {
						ctx.drawImage(img, 0, 0);
					};
				}
			});
	}

	render() {
		return (
			<div className="main">
				<div className="top">
					<div className="block">
						<p>Text color picker</p>
						<input
							className="form-control"
							type="color"
							id="colorPicker"
						/>
					</div>
					<div className="block">
						<p>Background</p>
						<input
							className="form-control"
							type="color"
							id="canvasColor"
						/>
					</div>
					<div className="block">
						<p>Font size</p>
						<select className="custom-select" id="fontSizePicker">
							<option value="5">5px</option>
							<option value="10">10px</option>
							<option value="20">20px</option>
							<option value="30">30px</option>
							<option value="40">40px</option>
							<option value="50">50px</option>
						</select>
					</div>
				</div>

				<canvas
					className="canvas"
					id="myCanvas"
					width="800"
					height="500"
				></canvas>

				<div className="bottom">
					<button
						type="button"
						className="button-86"
						id="clearButton"
					>
						Clear
					</button>
					<button type="button" className="button-86" id="saveButton">
						Save & download
					</button>
					<button
						type="button"
						className="button-86"
						id="retrieveButton"
					>
						Retrieve saved signature
					</button>
				</div>
			</div>
		);
	}
}

export default SignatureCanvas;
