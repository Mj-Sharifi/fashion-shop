export interface Fetch_RES<T> {
    data: T[],
    meta: {
        pagination: {
            start: number,
            limit: number,
            total: number
        }
    }

}

export interface Main_Slider {
    id: number,
    attributes: {
        subtitle: string
        title: string
        image: { data: Image_Api }
    } & General_Attributes
}
type General_Attributes = {
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
}
export interface Image_Api {
    id: number,
    attributes: {
        name: string,
        alternativeText: null,
        caption: null,
        width: number,
        height: number,
        formats: {
            thumbnail: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                path: null,
                width: number,
                height: number,
                size: number,
                sizeInBytes: number,
                url: string
            },
            small: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                path: null,
                width: number,
                height: number,
                size: number,
                sizeInBytes: number,
                url: string
            }
        },
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        previewUrl: null,
        provider: string,
        provider_metadata: null,
        createdAt: string,
        updatedAt: string
    }

}

export interface Single_Product {
    id: number,
    attributes: General_Attributes & {
        price: number,
        discount: number,
        title: string,
        bestSeller: boolean,
        isNew: boolean,
        rating: string,
        isAvailable: boolean,
        shortDescription: string,
        longDescription: string,
        categories: {
            data: Single_Category[]
        },
        subcategories: {
            data: Single_Subcategory[]
        },
        imageprimary: { data: Image_Api },
        imagesecondary: { data: Image_Api },
        imagesall: {
            data: Image_Api[]
        },
        colors: {
            data: Single_Color[]
        },
        sizes: {
            data: Single_Size[]
        },
        comments: {
            data: Single_Comment[]
        }
    }
}
export interface Single_Color {
    id: number,
    attributes: General_Attributes & {
        color: string
        products: { data: Single_Product[] }
    }
}
export interface Single_Size {
    id: number
    attributes: General_Attributes & {
        size: string,
        products: { data: Single_Product[] }
    }
}
interface Single_Comment {
    id: number,
    attributes: General_Attributes & {
        authorName: string
        email: string
        content: string
        rating: number

    }

}
export interface Single_Subcategory {
    id: number,
    attributes: General_Attributes & {
        title: string,
        slug: string
    }

}

export interface Single_Category {
    id: number,
    attributes: General_Attributes & {
        title: string,
        slug: string,
        products: {
            data: Single_Product[]
        },
        subcategories: {
            data: Single_Subcategory[]
        }
    }
}