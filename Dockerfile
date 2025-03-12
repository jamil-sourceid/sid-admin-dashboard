# Stage 1: Build Image
FROM node:22 AS build
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

#husky
RUN mkdir -p .husky
ENV HUSKY=0
ENV HUSKY_SKIP_INSTALL=1
#removes postinstall script
RUN npm pkg delete scripts.postinstall

RUN npm install
COPY . .

RUN npm run build

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]