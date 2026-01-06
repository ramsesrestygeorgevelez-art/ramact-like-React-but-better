export interface UrlLaunch {
    launchUrl(url: URL): UrlLaunchedSucessfull
    removeUrl(url: URL): UrlDeletedSuccessfull
}
/**
 * @description If its sucessfull, it returns this
 */
export type UrlLaunchedSucessfull = {
    url: URL
}
type UrlDeletedSuccessfull = {
   deletedUrl: URL
}
