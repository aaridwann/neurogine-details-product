export interface PaginationProps {
  total: number;
  activeIndex: number;
}

export interface ImageSliderProps {
  data: SliderItem[];
  autoPlayInterval?: number;
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

export interface ExtendedImageSliderProps extends ImageSliderProps {
  isLoading?: boolean;
}

export interface SlideItemProps {
  item?: SliderItem;
  isActive?: boolean;
}