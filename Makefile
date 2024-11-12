# STORAGE_URL=gs://bira-host-st.appspot.com
STORAGE_URL=gs://bira-host-ts.appspot.com

.PHONY: dev
dev:
	npm run dev

.PHONY: build
build:
	npm run build

.PHONY: deploy
deploy:
	firebase deploy --only hosting

.PHONY: build-deploy
build-deploy: build deploy

.PHONY: deploy-rules
deploy-rules:
	firebase deploy --only firestore:rules
	firebase deploy --only storage

.PHONY: cors
cors:
	gsutil cors set cors.json ${STORAGE_URL}
