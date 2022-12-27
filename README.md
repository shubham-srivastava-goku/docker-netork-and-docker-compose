# docker-netork-and-docker-compose


**To create tsconfig.json run:**
`npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true`


`docker build -t docker-network .`
`docker run mongo --network fav-network`

`docker run -p 8080:80 --rm -it --name docker-network --network fav-network --env DBIP=mongodb docker-network`

To remove all unused data from the docker system run `docker system prune -a`.

Use `host.docker.internal` to connect to host ip in place of `localhost`.

We can create netowrk inside docker using `docker network create network-name`. Then while running the container pass `--network network-name` to add that container to the network network-name. The ip of the network then can be accessed using container name directly.


### Docker Compose:
- docker-compose up to setup all environment
- Use -d to run it in detached mode.
- docker-compose up by default creats a metwork and will create a named volume if it is specified inside the .yaml file.
- docker-compose down to stop and remove all containers and network. It does not delete volumes by default.
    - Use -v with it to remove volume too.
- Use --build to rebuild the images used in docker
