
FROM node:18
# 필수 시스템 종속성 설치 (canvas 패키지 설치를 위해 필요)
RUN apt-get update && apt-get install -y \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "/app/src/app.js"]