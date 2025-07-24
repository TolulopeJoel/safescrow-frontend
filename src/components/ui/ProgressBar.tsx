import React from 'react';

interface ProgressBarProps {
	progress: string; // e.g., '33%', '66%', '100%'
	className?: string;

	// if broken is passed, segments should also be passed
	broken?: boolean;
	segments?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	progress,
	segments = 1,
	className = '',
	broken = false
}) => {
	// Parse progress to get numeric value for broken style calculations
	const progressValue = parseFloat(progress.replace('%', ''));

	if (broken) {
		// Create segments for broken style
		const activeSegments = Math.floor((progressValue / 100) * segments);
		const partialSegment = ((progressValue / 100) * segments) - activeSegments;

		return (
			<div className={`mb-6 ${className}`}>
				<div className="flex gap-1 h-3 w-full">
					{Array.from({ length: segments }, (_, index) => {
						let segmentClass = "h-3 bg-primary-100 rounded-lg transition-all duration-300";

						if (index < activeSegments) {
							// Fully active segment
							segmentClass = "h-3 bg-primary-600 rounded-lg transition-all duration-300";
						} else if (index === activeSegments && partialSegment > 0) {
							// Partially active segment
							segmentClass = "h-3 bg-primary-100 rounded-lg relative overflow-hidden transition-all duration-300";
						}

						return (
							<div
								key={index}
								className={segmentClass}
								style={{ flex: 1 }}
							>
								{index === activeSegments && partialSegment > 0 && (
									<div
										className="h-full bg-primary-600 transition-all duration-300"
										style={{ width: `${partialSegment * 100}%` }}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	// Default smooth style
	return (
		<div className={`mb-6 ${className}`}>
			<div className="h-3 w-full bg-primary-100 rounded-lg">
				<div
					className="h-3 bg-primary-600 rounded-lg transition-all duration-300"
					style={{ width: progress }}
				/>
			</div>
		</div>
	);
};

export default ProgressBar; 