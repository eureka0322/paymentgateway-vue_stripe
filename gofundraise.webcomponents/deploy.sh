#!/bin/sh
echo pushing version $VersionNumber

aws s3 cp dist/umd/gf-payments.min.js s3://gfr-js/all/js/$Env/payment-module/gf-payments.min.js --metadata version=$VersionNumber
aws s3 cp dist/umd/gf-payments.min.css s3://gfr-js/all/js/$Env/payment-module/gf-payments.min.css --metadata version=$VersionNumber

aws cloudfront create-invalidation --distribution-id E2E48HQDXKSQFI --paths /all/js/$Env/payment-module/*