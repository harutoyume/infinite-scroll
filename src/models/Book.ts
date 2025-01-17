export interface IBook {
    key: string;
    title: string | undefined;
    subtitle: string | undefined;
    author_name: string[] | undefined;
    publish_year: string[] | undefined;
    isbn: string[] | undefined;
}