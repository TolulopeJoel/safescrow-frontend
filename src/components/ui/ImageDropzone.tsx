import React, { useRef, useState } from 'react';

interface ImageDropzoneProps {
    label?: string;
    images: File[];
    imagePreviews: string[];
    onChange: (files: File[], previews: string[]) => void;
    error?: string;
    maxImages?: number;
    isRequired?: boolean;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
    label,
    images,
    imagePreviews,
    onChange,
    error,
    maxImages = 10,
    isRequired = false,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | File[]) => {
        const fileArr = Array.from(files).filter(f => f.type.startsWith('image/'));
        // Prevent duplicates
        const newFiles = fileArr.filter(f => !images.some(img => img.name === f.name && img.size === f.size));
        if (!newFiles.length) return;
        const updatedImages = [...images, ...newFiles].slice(0, maxImages);
        // Generate previews for new files
        let newPreviews: string[] = [];
        let loaded = 0;

        // Generate previews for new files
        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                loaded++;
                if (loaded === newFiles.length) {
                    onChange(updatedImages, [...imagePreviews, ...newPreviews].slice(0, maxImages));
                }
            };
            reader.readAsDataURL(file);
        });
        if (newFiles.length === 0) {
            onChange(updatedImages, imagePreviews);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleRemoveImage = (idx: number) => {
        const newImages = images.filter((_, i) => i !== idx);
        const newPreviews = imagePreviews.filter((_, i) => i !== idx);
        onChange(newImages, newPreviews);
    };
    const handleAddMoreClick = () => {
        inputRef.current?.click();
    };

    const canAddMore = images.length < maxImages;

    return (
        <div>
            {label && <label className="block text-sm font-semibold mb-3">{label}{isRequired && <span className="text-red-500 ml-1">*</span>}</label>}
            <div
                className={
                    imagePreviews.length === 0
                        ? `relative flex flex-col items-center justify-center border-2  border-dashed
                            ${isDragging ? 'border-primary-400 bg-primary-50' : (error ? 'border-red-400 bgred-50' : 'border-gray-300 bg-gray-50')}
                            rounded-xl p-4 transition-colors duration-200 cursor-pointer`
                        : 'flex flex-wrap gap-3 items-center min-h-[120px]'
                }
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                {...(imagePreviews.length === 0 && canAddMore ? { onClick: handleAddMoreClick } : {})}
                style={{ minHeight: '120px' }}
            >
                {imagePreviews.length === 0 ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" /></svg>
                        <span className="text-gray-500 text-sm">Click or drag images here to upload</span>
                        <span className="text-xs text-gray-400 mt-1">JPG, PNG, max 5MB each. You can add up to {maxImages} images.</span>
                    </>
                ) : (
                    <>
                        {imagePreviews.map((src, idx) => (
                            <div key={idx} className="relative group">
                                <img src={src} alt={`Preview ${idx + 1}`} className="max-h-24 rounded-lg border object-contain" />
                                <button
                                    type="button"
                                    onClick={e => { e.stopPropagation(); handleRemoveImage(idx); }}
                                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition opacity-0 group-hover:opacity-100"
                                    title="Remove image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                        {/* Add more card */}
                        {canAddMore && (
                            <div
                                className="flex flex-col items-center justify-center border-2 border-dashed border-primary-300 bg-primary-50 hover:bg-primary-100 rounded-lg p-4 cursor-pointer min-w-[96px] min-h-[96px] transition-colors duration-200 group"
                                onClick={handleAddMoreClick}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                <span className="text-primary-500 text-xs font-medium">Add more</span>
                            </div>
                        )}
                    </>
                )}
                <input
                    ref={inputRef}
                    id="order-image-input"
                    type="file"
                    accept="image/*"
                    name="images"
                    multiple
                    onChange={handleInputChange}
                    className="hidden"
                    disabled={!canAddMore}
                />
            </div>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default ImageDropzone;