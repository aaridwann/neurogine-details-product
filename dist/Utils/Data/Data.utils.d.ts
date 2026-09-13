import type { SliderItem } from '../../Components/ImageSlider/ImageSlider.component.types';
import type { ProductType } from '../../Types';
declare const mapProductToTwoSlides: (product?: ProductType | null) => SliderItem[];
declare const calcOriginalPrice: (price: number, discount?: number) => string;
declare const formatDate: (dateString: string) => string;
export { mapProductToTwoSlides, calcOriginalPrice, formatDate };
//# sourceMappingURL=Data.utils.d.ts.map