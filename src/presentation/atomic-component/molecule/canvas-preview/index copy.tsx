// import { Button } from '@mui/material';
// import { useEffect, useRef, useState } from 'react';
// import type { FC } from 'react';
// import type { InputOnImageProps } from 'domain/models';

// interface CanvasPreviewProps {
//   inputOnImage: InputOnImageProps[];
//   url: string;
// }

// export const CanvasPreview: FC<CanvasPreviewProps> = ({ inputOnImage, url }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [zoomLevel, setZoomLevel] = useState<number>(1);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [startX, setStartX] = useState<number>(0);
//   const [startY, setStartY] = useState<number>(0);
//   const [dragStartX, setDragStartX] = useState<number>(0);
//   const [dragStartY, setDragStartY] = useState<number>(0);
//   const [offsetX, setOffsetX] = useState<number>(0);
//   const [offsetY, setOffsetY] = useState<number>(0);
//   const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (url) {
//       const canvas = canvasRef.current;

//       if (canvas !== null) {
//         const ctx = canvas.getContext('2d');

//         if (ctx !== null) {
//           const backgroundImage = new Image();

//           backgroundImage.src = url;

//           backgroundImage.onload = (): void => {
//             const { width } = backgroundImage;
//             const { height } = backgroundImage;

//             canvas.width = width;
//             canvas.height = height;

//             ctx.clearRect(0, 0, width, height);

//             ctx.scale(zoomLevel, zoomLevel);
//             ctx.translate(offsetX, offsetY);

//             ctx.drawImage(backgroundImage, 0, 0);

//             inputOnImage?.forEach((item) => {
//               ctx.fillStyle = item.color ?? 'black';
//               const size = Number(item.size ?? 12);

//               ctx.font = `${size}px ${item.font ?? 'Arial'}`;

//               const rotate = item.rotate ?? 1;

//               const angle = Number(rotate * Math.PI) / 180;

//               ctx.translate(item.left, item.top + 10);
//               ctx.rotate(angle);
//               ctx.fillText(String(item.text ?? ' ').toUpperCase(), 0, 0);
//               ctx.rotate(-angle);
//               ctx.translate(-item.left, -(item.top + 10));
//             });
//           };
//         }
//       }
//     }
//   }, [url, inputOnImage, zoomLevel, offsetX, offsetY]);

//   useEffect(() => {
//     const handleWheel = (event: WheelEvent): void => {
//       if (event.ctrlKey) {
//         event.preventDefault();
//         if (event.deltaY < 0) setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
//         else setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 0.1));
//       }
//     };

//     const handleMouseDown = (event: MouseEvent): void => {
//       setIsDragging(true);
//       setStartX(event.clientX);
//       setStartY(event.clientY);
//       setDragStartX(offsetX);
//       setDragStartY(offsetY);
//     };

//     const handleMouseMove = (event: MouseEvent): void => {
//       if (isDragging) {
//         const dx = event.clientX - startX;
//         const dy = event.clientY - startY;

//         setOffsetX(dragStartX + dx);
//         setOffsetY(dragStartY + dy);
//       }

//       const canvas = canvasRef.current;

//       if (canvas) {
//         const rect = canvas.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;

//         setMousePosition({ x, y });
//       }
//     };

//     const handleMouseUp = (): void => {
//       setIsDragging(false);
//     };

//     const handleMouseLeave = (): void => {
//       setMousePosition(null);
//     };

//     const canvas = canvasRef.current;

//     if (canvas) {
//       canvas.addEventListener('wheel', handleWheel);
//       canvas.addEventListener('mousedown', handleMouseDown);
//       canvas.addEventListener('mousemove', handleMouseMove);
//       canvas.addEventListener('mouseup', handleMouseUp);
//       canvas.addEventListener('mouseleave', handleMouseLeave);
//     }

//     return () => {
//       if (canvas) {
//         canvas.removeEventListener('wheel', handleWheel);
//         canvas.removeEventListener('mousedown', handleMouseDown);
//         canvas.removeEventListener('mousemove', handleMouseMove);
//         canvas.removeEventListener('mouseup', handleMouseUp);
//         canvas.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, [zoomLevel, offsetX, offsetY, isDragging]);

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (canvas) {
//       const ctx = canvas.getContext('2d');

//       if (ctx && mousePosition) {
//         const backgroundImage = new Image();

//         backgroundImage.src = url;
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(backgroundImage, 0, 0);
//         ctx.font = '32px Arial';
//         ctx.fillStyle = 'black';
//         ctx.fillText(
//           `X: ${mousePosition.x.toFixed(2)}, Y: ${mousePosition.y.toFixed(2)}`,
//           mousePosition.x,
//           mousePosition.y
//         );
//         inputOnImage?.forEach((item) => {
//           ctx.fillStyle = item.color ?? 'black';
//           const size = Number(item.size ?? 12);

//           ctx.font = `${size}px ${item.font ?? 'Arial'}`;

//           const rotate = item.rotate ?? 1;

//           const angle = Number(rotate * Math.PI) / 180;

//           ctx.translate(item.left, item.top + 10);
//           ctx.rotate(angle);
//           ctx.fillText(String(item.text ?? ' ').toUpperCase(), 0, 0);
//           ctx.rotate(-angle);
//           ctx.translate(-item.left, -(item.top + 10));
//         });
//       }
//     }
//   }, [mousePosition]);

//   if (url)
//     return (
//       <>
//         <canvas
//           className={`fixed right-[7%] top-[120px] z-20 ${open ? '' : 'max-h-[800px]'}`}
//           ref={canvasRef}
//         />

//         <div className={'fixed right-[7%] top-[120px] z-30'}>
//           <Button onClick={(): void => setOpen(!open)}>{open ? 'Fechar' : 'Abrir'}</Button>
//         </div>
//       </>
//     );

//   return null;
// };
