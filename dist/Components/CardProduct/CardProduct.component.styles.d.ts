declare const styles: Readonly<{
    card: {
        backgroundColor: string;
        borderRadius: number;
        borderWidth: number;
        borderColor: string;
        width: number;
        overflow: "hidden";
    };
    image: {
        width: string;
        height: number;
        backgroundColor: string;
    };
    content: {
        padding: number;
        gap: number;
    };
    brand: {
        color: string;
        fontSize: number;
        fontWeight: "500";
    };
    title: {
        color: string;
        fontWeight: "600";
    };
    priceContainer: {
        flexDirection: "row";
        alignItems: "center";
        gap: number;
        marginTop: number;
    };
    price: {
        color: string;
        fontWeight: "700";
    };
    originalPrice: {
        color: string;
        textDecorationLine: "line-through";
        fontSize: number;
    };
    ratingRow: {
        flexDirection: "row";
        alignItems: "center";
        gap: number;
        marginTop: number;
    };
    ratingText: {
        color: string;
        fontWeight: "600";
        fontSize: number;
    };
}>;
export default styles;
//# sourceMappingURL=CardProduct.component.styles.d.ts.map