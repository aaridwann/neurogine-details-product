declare const styles: Readonly<{
    imageSliderWrapper: {
        height: number;
        position: "relative";
    };
    imageSliderCardContainer: {
        height: number;
        width: number;
    };
    imageSliderImage: {
        height: string;
        width: string;
    };
    imageSliderOverlay: {
        backgroundColor: string;
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    };
    imageSliderTextContainer: {
        bottom: number;
        left: number;
        position: "absolute";
        right: number;
    };
    imageSliderSubtitle: {
        color: string;
        fontSize: number;
        fontWeight: "600";
        letterSpacing: number;
    };
    imageSliderTitle: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        marginTop: number;
    };
    imageSliderPaginationContainer: {
        alignSelf: "center";
        bottom: number;
        flexDirection: "row";
        position: "absolute";
    };
    imageSliderDot: {
        borderRadius: number;
        height: number;
        marginHorizontal: number;
    };
    imageSliderActiveDot: {
        backgroundColor: string;
        width: number;
    };
    imageSliderInactiveDot: {
        backgroundColor: string;
        width: number;
    };
    imageSliderSkeletonPagination: {
        alignSelf: "center";
        bottom: number;
        flexDirection: "row";
        position: "absolute";
    };
    imageSliderDotMargin: {
        marginHorizontal: number;
    };
    imageSliderSkeletonSubtitleMargin: {
        marginBottom: number;
    };
}>;
export default styles;
//# sourceMappingURL=ImageSlider.component.styles.d.ts.map