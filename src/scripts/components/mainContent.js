import createDivContainer from "./containers/divContainer";

export default function createMainContentContainer() {
    const mainContentContainer = createDivContainer();
    mainContentContainer.id = "main-content-container";
    return mainContentContainer;
}