import React, { useState } from "react";

const accessibilityFeatures = [
	{
		label: "Screen Reader Support",
		description:
			"All navigation and content are compatible with screen readers for visually impaired users.",
		icon: <i className="ri-mark-pen-line" style={{color:"gray"}}></i>,
	},
	{
		label: "Keyboard Navigation",
		description:
			"Navigate and checkout using keyboard shortcuts for a faster, hands-free experience.",
		icon: <i className="ri-keyboard-fill"  style={{color:"gray"}}></i>,
	},
	{
		label: "High Contrast Mode",
		description:
			"Switch to high-contrast colors for better visibility and readability.",
		icon: <i className="ri-creative-commons-sa-fill"  style={{color:"gray"}}></i>,
	},
	{
		label: "Text Resizing",
		description: "Easily adjust text size for comfortable reading.",
		icon: <i className="ri-search-line"  style={{color:"gray"}}></i>,
	},
	{
		label: "Multilingual Support",
		description: "Access the platform in English and Hindi for wider reach.",
		icon:<i className="ri-ie-fill t"  style={{color:"gray"}} ></i>,
	},
];

export default function Accessibility() {
	const [contrast, setContrast] = useState(false);
	const [fontSize, setFontSize] = useState(16);

	return (
		<div
			className={`max-w-4xl mx-auto p-6 bg-gray-50 ${
				contrast ? "contrast" : ""
			}`}
			style={{ fontSize }}
		>
			<h2 className="text-3xl font-bold mb-6 text-green-600">
				Accessibility at Fresh-Basket
			</h2>
			<p className="text-gray-800 mb-6">
				At Fresh-Basket, we are committed to ensuring that our website and app
				are accessible to all users, including people with disabilities. We
				continuously work on improving accessibility standards so that everyone
				can enjoy a seamless shopping experience.
			</p>
			{/* Interactive Controls */}
			<div className="flex gap-4 mb-8 flex-wrap">
				<button
					className="px-4 py-2 rounded-lg font-medium border bg-green-600 text-white transition-colors"
					onClick={() => setContrast((c) => !c)}
				>
					{contrast ? "Disable High Contrast" : "Enable High Contrast"}
				</button>
				<button
					className="px-4 py-2 rounded-lg font-medium border bg-gray-200 text-gray-800"
					onClick={() => setFontSize((f) => Math.max(12, f - 2))}
				>
					A-
				</button>
				<button
					className="px-4 py-2 rounded-lg font-medium border bg-gray-200 text-gray-800"
					onClick={() => setFontSize((f) => Math.min(24, f + 2))}
				>
					A+
				</button>
			</div>
			{/* Features Section */}
			<div className="mb-8">
				<h3 className="text-xl font-semibold mb-3 text-green-600">
					Accessibility Features
				</h3>
				<ul className="space-y-4">
					{accessibilityFeatures.map((feature, idx) => (
						<li key={idx} className="flex items-start gap-3">
							<span className="text-2xl" aria-hidden>
								{feature.icon}
							</span>
							<div>
								<span className="font-semibold text-gray-800">
									{feature.label}
								</span>
								<p className="text-sm text-gray-800">
									{feature.description}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
			{/* Policy Section */}
			<div className="mb-8">
				<h3 className="text-xl font-semibold mb-3 text-green-600">
					Our Commitment
				</h3>
				<p className="text-gray-800">
					We follow WCAG (Web Content Accessibility Guidelines) standards to
					make our platform inclusive. Our team actively works on improvements
					to ensure that Fresh-Basket is accessible for everyone, regardless of
					ability.
				</p>
			</div>
			{/* Feedback Section */}
			<div className="mb-8">
				<h3 className="text-xl font-semibold mb-3 text-green-600">
					Accessibility Feedback
				</h3>
				<p className="text-gray-800 mb-2">
					If you experience any issues with accessibility or have suggestions to
					improve, please reach out to us.
				</p>
				<p className="text-gray-800">
				<i className="ri-mail-fill" style={{color:"gray"}}></i>:{" "}
					<a
						href="/Contactus"
						className="text-green-600 underline"
					>
						accessibility@freshbasket.com
					</a>
				</p>
				<p className="text-gray-800"><i className="ri-phone-fill" style={{color:"gray"}}></i> Phone: +91-6263738729</p>
			</div>
			<div className="text-sm text-gray-800 flex justify-center">
			   <p>	Devloped By Rohit Vishawakrma  <i className="ri-mail-fill" style={{color:"gray-800"}}></i> rohitvishwakrma@gmail.com</p>
			</div>
		</div>
	);
}
