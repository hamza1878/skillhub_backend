declare module 'keystone-storage-adapter-s3' {
    const value: any;
   
        export class S3StorageAdapter {
          constructor(options: {
            accessKeyId: any;
            secretAccessKey: any;
            bucket: any;
            region: any;
            key?: any;
            s3Url:any
          });
          // Ajoutez les autres méthodes et propriétés selon ce qui est exporté par le module
        }
      }
      
