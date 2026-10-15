import { URL } from "node:url";

// create a url
const url = new URL("https://dwproducts.com:8080/products?id=42&sort=price");
console.log(url.hostname); // dwproducts.com
console.log(url.port); // 8080
console.log(url.pathname); // /products
console.log(url.search); // ?id=42&sort=price

// read query params
const newUrl = new URL(
  "https://example.com/products?page=2&limit=10&category=books",
);

console.log(newUrl.searchParams.get("page")); // "2"
console.log(newUrl.searchParams.get("limit")); // "10"
console.log(newUrl.searchParams.get("category")); // "books"

// modify a url
url.pathname = "/users";
url.searchParams.set("active", "true");
console.log(url.toString());
