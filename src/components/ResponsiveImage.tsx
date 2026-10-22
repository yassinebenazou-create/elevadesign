import type { ImgHTMLAttributes } from 'react'

const responsiveWidths = [640, 1280, 1920]

function responsiveSourceSet(src: string) {
  const relativePath = src.replace(/^\/images\//, '').replace(/\.[^/.]+$/, '')
  const basePath = encodeURI(`/images/responsive/${relativePath}`)

  return responsiveWidths.map((width) => `${basePath}-${width}.avif ${width}w`).join(', ')
}

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  sizes: string
}

export function ResponsiveImage({ src, sizes, ...imageProps }: ResponsiveImageProps) {
  return (
    <picture className="responsive-picture">
      <source type="image/avif" srcSet={responsiveSourceSet(src)} sizes={sizes} />
      <img src={src} sizes={sizes} {...imageProps} />
    </picture>
  )
}
