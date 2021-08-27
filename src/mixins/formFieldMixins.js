export const formFieldMixins = {
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            default: '',
        },
        value: [String, Number],
    }
}