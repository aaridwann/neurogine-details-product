declare const styles: Readonly<{
    sheetBackground: {
        backgroundColor: string;
        borderRadius: number;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    indicator: {
        backgroundColor: string;
        width: number;
        height: number;
        borderRadius: number;
        marginTop: number;
    };
    contentContainer: {
        flex: number;
        paddingHorizontal: number;
        paddingBottom: number;
    };
    header: {
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "space-between";
        paddingVertical: number;
        borderBottomWidth: number;
        borderBottomColor: string;
        marginBottom: number;
    };
    titleText: {
        fontSize: number;
        fontWeight: "700";
        color: string;
    };
    closeButton: {
        padding: number;
        borderRadius: number;
        backgroundColor: string;
        width: number;
        height: number;
        alignItems: "center";
        justifyContent: "center";
    };
    closeText: {
        fontSize: number;
        fontWeight: "600";
        color: string;
    };
    body: {
        flex: number;
    };
}>;
export default styles;
//# sourceMappingURL=BottomSheet.component.styles.d.ts.map