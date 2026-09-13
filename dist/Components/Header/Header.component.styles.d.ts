declare const styles: Readonly<{
    container: {
        height: number;
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "space-between";
        paddingHorizontal: number;
        backgroundColor: string;
        borderBottomWidth: number;
        borderBottomColor: string;
    };
    safeArea: {
        backgroundColor: string;
    };
    titleContainer: {
        alignItems: "center";
        flex: number;
        paddingHorizontal: number;
    };
    titleText: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        letterSpacing: number;
    };
    subtitleText: {
        color: string;
        fontSize: number;
        fontWeight: "500";
        marginTop: number;
    };
    rightActionContainer: {
        alignItems: "center";
        flexDirection: "row";
        position: "relative";
    };
    badge: {
        backgroundColor: string;
        borderRadius: number;
        height: number;
        position: "absolute";
        right: number;
        top: number;
        width: number;
    };
    lottieContainer: {
        height: number;
        position: "absolute";
        right: number;
        top: number;
        width: number;
    };
    lottie: {
        height: string;
        width: string;
    };
}>;
export default styles;
//# sourceMappingURL=Header.component.styles.d.ts.map