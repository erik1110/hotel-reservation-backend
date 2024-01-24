import { HttpStatus, Injectable } from "@nestjs/common";
import { FirebaseService } from "./firebase.service";
import { v4 as uuidv4 } from 'uuid';
import { GetSignedUrlConfig } from '@google-cloud/storage';
import { AppError } from "src/utils/appError";

@Injectable()
export class ImageService {
    constructor(private readonly firebaseService: FirebaseService){}

    async uploadImage(file): Promise<string> {
        const maxSize = 3 * 1024 * 1024; // 3 MB in bytes
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp'];
        if (file.size > maxSize) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'UserError', '超過 3 MB');
        }
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'UserError', '不支援的檔案格式');
        }
        const storage = this.firebaseService.getStorageInstance();
        const bucket = storage.bucket();
        const encodedOriginalName = encodeURIComponent(file.originalname);
        const fileName = `${uuidv4()}_${encodedOriginalName}`;
        const fileUpload = bucket.file(fileName);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            }
        });

        return new Promise((resolve, reject) => {
            stream.on('error', (error) =>{
                reject(error);
            });

            stream.on('finish', async () => {
                const imageUrl = await this.getFirebaseUrl(fileUpload);
                resolve(imageUrl);
            });

            stream.end(file.buffer);
        });
    }

    private async getFirebaseUrl(fileUpload): Promise<string> {
        return new Promise((resolve, reject) => {
            const blobStream = fileUpload.createReadStream();

            const bucket = this.firebaseService.getStorageInstance().bucket();
            const blob = bucket.file(fileUpload.name);

            blobStream.pipe(blob.createWriteStream())
                .on('finish', () => {
                    const config: GetSignedUrlConfig = {
                        action: 'read',
                        expires: '12-31-2024',
                    };

                    blob.getSignedUrl(config, (err, imgUrl) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(imgUrl);
                        }
                    });
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }
}
