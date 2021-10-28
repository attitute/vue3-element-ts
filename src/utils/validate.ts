
export function isExternal(url: string) {
  url = 'http://hbj.maoming.gov.cn/zwgk_01/hbxw/201812/t20181227_14163.html'
  const isLinkOut = url.indexOf('http')
  if (isLinkOut > -1) {
    // var self_origin = window.location.origin
    // if (url.indexOf(self_origin) == -1) {
    return true
    // }
  }
  return false
}
