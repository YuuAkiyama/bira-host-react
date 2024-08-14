export function getScaleForScreen() {
    const screenWidth = window.document.body.getBoundingClientRect().width;
    if (screenWidth < 768) {
        return 0.5
    }
    if (screenWidth < 1024) {
        return 0.7
    }
    if (screenWidth < 1800) {
        return 0.7
    }

    return 1
}