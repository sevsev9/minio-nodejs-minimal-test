# minio-nodejs-minimal-test
A very minimal app to test the basic functionalities of MinIO with NodeJS.

Please excuse the minimal frontend, as it was a fast test project... ;)

# Technologies/Libraries Used
- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [MinIO Javascript Library](https://docs.min.io/docs/javascript-client-api-reference.html)
- [Multer](https://www.npmjs.com/package/multer)
- [Multer MinIO Storage Engine](https://www.npmjs.com/package/multer-minio-storage-engine)
- [BodyParser](https://www.npmjs.com/package/body-parser)


# Running the App
## Starting MinIO Docker Container
Configure the `docker_minio_run.sh` to your needs.
  - Create a mount point for the virtual volume, where the MinIO container will store its files.
    - e.g.: `mkdir ~/minio`
  - Change the mountpoint in the `docker_minio_run.sh` file.
    - e.g.: change the -v line to `/home/$USER/minio:/data`
  - If needed make the shell script executable: `sudo chmod -X ./docker_minio_run.sh`
  - Run the `docker_minio_run.sh` or the contained statement directly.
Create Test Bucket in your MinIO Interface
  - Default Values:
    - Type in your Browser `localhost:9001` and log in with the default credendentials
    - Click on `Buckets`
    - Click `Create Bucket` and name it for example `test`
## Optional: Configuring the .env
Change the values you have adjusted in the docker run command accordingly in the .env file.
  - e.g.: set the MinIO Bucket property to `test`: `MINIO_BUCKET=test`
## Running the NodeJS App
  - Install Dependecies
    - `npm install`
  - Run the app
    - Test: `npm run dev`
    - Build: `npm run build`
    - Run Built Code: `npm run start`
