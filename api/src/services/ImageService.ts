import fs from "fs";
import path from "path";
import sharp from "sharp";

export default class ImageService {
  // async deleteWebpFiles(tag: string) {
  //   const directory = path.join(__dirname, "../../", "uploads/bi");
  //   fs.readdir(directory, (err, files) => {
  //     if (err) throw err;
  //     for (const file of files) {
  //       let fileExtension = path.extname(file);
  //       if (fileExtension === "" || fileExtension === ".webp") {
  //         fs.unlink(path.join(directory, file), (err) => {
  //           if (err) throw err;
  //         });
  //       }
  //     }
  //   });
  // }
  // async convertToWebp(book: any) {
  //   const directory = path.join(__dirname, "../../", "uploads/bi");
  //   if (book.cover.slice(-3) === "jpg" || book.cover.slice(-3) === "jpeg" || book.cover.slice(-3) === "png" || book.cover.slice(-3) === "PNG") {
  //     if (fs.existsSync(`${directory}/${book.cover}`)) {
  //       fs.readFile(`${directory}/${book.cover}`, (err, file) => {
  //         if (err) throw err;
  //         sharp(file)
  //           .webp()
  //           .toFile(`${directory}/${book.cover.substring(0, book.cover.length - 3)}webp`)
  //           .then(() => {
  //           })
  //           .catch((err) => console.warn(err));
  //       });
  //     }
  //   }
  // }
  // async renamePDFFile(book: any, newName: string) {
  //   const directory = path.join(__dirname, "../../", "uploads/bf");
  //   fs.rename(`${directory}/${book.filename}`, `${directory}/${newName}`, function(err) {
  //     if ( err ) console.log('ERROR: ' + err);
  //   });
  // }
  // async renameCoverImage(book: any, newCoverName: string) {
  //   const directory = path.join(__dirname, "../../", "uploads/bi");
  //   fs.rename(`${directory}/${book.cover}.jpg`, `${directory}/${newCoverName}`, function(err) {
  //     if ( err ) console.log('ERROR: ' + err);
  //   });
  // }
}
