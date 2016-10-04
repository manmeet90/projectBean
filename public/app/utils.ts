export const utils = {
    showLoader : () => {
        document.getElementById("mainLoader").classList.remove("hide");
    },
    hideLoader : () => {
        document.getElementById("mainLoader").classList.add("hide");
    }
};