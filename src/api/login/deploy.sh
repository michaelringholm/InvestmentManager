functionName=om-invest-login-fn
clear
echo Compressing function code...
#zip -rq drop.zip .
7z a -r drop.zip *
echo "Uploading to Lambda function [$functionName] to region [$region]..."
aws lambda update-function-code --region $region --function-name $functionName --zip-file fileb://drop.zip > /dev/null
echo Cleaning up...
rm drop.zip
echo Done.

#aws s3 cp invoke-sfn-api.zip s3://iac-demo-lambda-code-bucket
#rm invoke-sfn-api.zip

# Upload to Lambda
#s3://iac-demo-lambda-code-bucket/invoke-sfn-api.zip