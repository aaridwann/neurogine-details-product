export interface PaginationProps {
  total: number;
  activeIndex: number;
}

export interface ImageSliderProps {
  data: SliderItem[];
  autoPlayInterval?: number;
//   onSlideChane
}

export interface SliderItem {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
}

export interface ImageSliderProps {
  image: string;
  alt: string;
}