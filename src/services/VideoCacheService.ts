class VideoCacheService {
  private static cache = new Map<string, string>()

  static async preload(url: string): Promise<string> {
    if (this.cache.has(url)) return this.cache.get(url)!

    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    this.cache.set(url, blobUrl)
    return blobUrl
  }

  static getCached(url: string): string | null {
    return this.cache.get(url) || null
  }

  static clear() {
    this.cache.forEach((blobUrl) => {
      URL.revokeObjectURL(blobUrl)
    })
    this.cache.clear()
  }
}

export default VideoCacheService
