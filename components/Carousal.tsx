import { CardCarousel } from "@/components/ui/card-carousel"

export default function Carousal() {
  const images = [
    { src: "/carousal1.jpg", alt: "Image 1" },
    { src: "/carousal2.jpg", alt: "Image 2" },
    { src: "/carousal3.jpg", alt: "Image 3" },
  ]

  return (
    <div className="pt-40">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}
