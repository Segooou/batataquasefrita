import { setCanvasImage } from 'store/canvas-image/slice';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { InputOnImageProps } from 'domain/models';

interface CanvasPreviewProps {
  inputOnImage: InputOnImageProps[];
  url: string;
}

export const CanvasPreview: FC<CanvasPreviewProps> = ({ inputOnImage, url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (url) {
      const canvas = canvasRef.current;

      if (canvas !== null) {
        const ctx = canvas.getContext('2d');

        if (ctx !== null) {
          const backgroundImage = new Image();

          backgroundImage.src = url;

          backgroundImage.onload = (): void => {
            const { width } = backgroundImage;
            const { height } = backgroundImage;

            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);

            ctx.drawImage(backgroundImage, 0, 0);

            const getImage = (folder: 'assinatura' | 'homem' | 'mulher'): string => {
              switch (folder) {
                case 'assinatura':
                  return 'https://batatafrita.azurewebsites.net/static/uploads/assinatura/05.png';
                case 'mulher':
                  return 'https://batatafrita.azurewebsites.net/static/uploads/mulher/04.png';
                case 'homem':
                  return 'https://batatafrita.azurewebsites.net/static/uploads/homem/01.png';

                default:
                  return 'https://batatafrita.azurewebsites.net/static/uploads/assinatura/04.png';
              }
            };

            inputOnImage?.forEach((item) => {
              if (typeof item.folder === 'string') {
                const img = new Image();

                img.onload = (): void => {
                  if (item.folder === 'assinatura') ctx.filter = 'blur(0.5px) brightness(80%)';
                  else ctx.filter = 'blur(1px) brightness(80%)';

                  ctx.drawImage(img, item.left, item.top, item.width, item.height);
                };

                img.src = item?.text?.length > 0 ? item.text : getImage(item.folder);
              } else {
                const size = Number(item.size ?? 12);

                ctx.filter = 'blur(0.5px) brightness(100%)';
                ctx.fillStyle = item.color ?? 'black';

                ctx.font = `${size}px ${item.font ?? 'Arial'}`;

                const rotate = item.rotate ?? 1;

                const angle = Number(rotate * Math.PI) / 180;

                ctx.translate(item.left, item.top + 10);
                ctx.rotate(angle);
                const text =
                  item.value === 'assinatura'
                    ? String(item.text ?? ' ')
                    : String(item.text ?? ' ').toUpperCase();

                ctx.fillText(text, 0, 0);
                ctx.rotate(-angle);
                ctx.translate(-item.left, -(item.top + 10));
              }
            });
          };
        }
      }
    }
  }, [inputOnImage, url]);

  if (url)
    return (
      <div
        className={
          'fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-30 overflow-auto'
        }
        onClick={() => dispatch(setCanvasImage({ itemSelected: null }))}
      >
        <canvas ref={canvasRef} />
      </div>
    );

  return null;
};
