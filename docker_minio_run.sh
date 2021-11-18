docker run \
-p 9000:9000 \
-p 9001:9001 \
-e MINIO_ROOT_USER=doc_accsess \
-e MINIO_ROOT_PASSWORD=Change2Me! \
-v /home/"$USER"/minio/:/data \
-d \
--name minio \
minio/minio server /data --console-address ":9001"