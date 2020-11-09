// Get API Key from environment variable
var accessKey = pm.environment.get("accessKey");
var secretKey = pm.environment.get("secretKey");

var signatureVersion = 2;
var signatureMethod = "HmacSHA256";
var timestamp = new Date().toISOString().slice(0, 19);

// Get request detail form postman
var requestMethod = pm.request.method;
var queryParam = pm.request.url.query.members;
var host = pm.request.url.host.join(".");
var path = "/"+pm.request.url.path.join("/");

var queryList = {
    values: [],
    sigkey: ["AccessKeyId", "SignatureVersion", "SignatureMethod", "Timestamp", "Signature"],
    put: function(k, v){
        var index = -1;
        for(var i = 0;i<this.values.length;i++){
            var key = this.values[i].split("=")[0];
            
            if(key==k){
                index = -1;
                break;
            }
        }
        var value = encodeURIComponent(v);
        if(index==-1){
            this.values.push(k+"="+value);
        }else{
            this.values[index] = k+"="+value;
        }
    },
    sortedValues: function(){
        return this.values.sort();
    },
    inSigkey: function(k){
        for(var i = 0; i<this.sigkey.length; i++){
            if(k == this.sigkey[i]){
                return true;
            }
        }
        return false
    }
};

for(var i = 0;i<queryParam.length;i++){
    if(queryParam[i].disabled||queryList.inSigkey(queryParam[i].key))
        continue;
    queryList.put(queryParam[i].key, queryParam[i].value);
}
queryList.put("Timestamp",timestamp);
queryList.put("AccessKeyId",accessKey);
queryList.put("SignatureMethod",signatureMethod);
queryList.put("SignatureVersion",signatureVersion);
    
var payload = requestMethod.toUpperCase()+"\n"+
            host.toLowerCase()+"\n"+
            path+"\n"+
            queryList.sortedValues().join("&");
            
console.log(payload);

var signatureBytes = CryptoJS.HmacSHA256(payload, secretKey);
var signature = CryptoJS.enc.Base64.stringify(signatureBytes);

pm.environment.set("accessKey", accessKey);
pm.environment.set("signatureVersion", signatureVersion);
pm.environment.set("signatureMethod", signatureMethod);
pm.environment.set("timestamp", encodeURIComponent(timestamp));
pm.environment.set("signature", encodeURIComponent(signature));