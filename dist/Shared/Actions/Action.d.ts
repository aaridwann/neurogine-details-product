/**
 * Constants for action types
 */
declare const constants: {
    SET_DATA_DETAIL_PRODUCT: string;
    GET_DETAIL_PRODUCT_REQUEST: string;
    GET_DETAIL_PRODUCT_FAILED: string;
    GET_DETAIL_PRODUCT_SUCCESS: string;
};
/**
 * Actions for detail product
 * @returns {object} Actions for detail product
 */
declare const actions: {
    setDataDetailProduct: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    getDetailProductRequest: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    getDetailProductFailed: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    getDetailProductSuccess: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
export { constants, actions };
//# sourceMappingURL=Action.d.ts.map