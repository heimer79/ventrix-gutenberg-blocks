<?php
/**
 * Test script for public repository download
 * 
 * This script tests download from a public repository to verify
 * if the server can download from GitHub at all.
 */

echo "🔍 Testing Public Repository Download\n";
echo "=====================================\n\n";

// Test with a public repository
$PUBLIC_REPO = 'octocat/Hello-World';
$PUBLIC_ZIP_URL = 'https://github.com/octocat/Hello-World/archive/refs/heads/master.zip';

echo "1️⃣ Testing public repository download...\n";
echo "   📥 URL: $PUBLIC_ZIP_URL\n";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $PUBLIC_ZIP_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'WordPress/Ventrix-Plugin-Updater');

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "   📊 Response code: $http_code\n";

if ($http_code === 200) {
    echo "   ✅ Public repository download successful!\n";
    echo "   📦 Content length: " . strlen($response) . " bytes\n";
    
    // Verify it's a valid ZIP
    if (substr($response, 0, 4) === 'PK') {
        echo "   ✅ Valid ZIP file signature detected\n";
    } else {
        echo "   ⚠️  Invalid ZIP file signature\n";
    }
} else {
    echo "   ❌ Public repository download failed\n";
    if (!empty($error)) {
        echo "   📄 cURL Error: $error\n";
    }
    echo "   📄 Error response: " . substr($response, 0, 200) . "...\n";
}

echo "\n2️⃣ Testing GitHub API for public repo...\n";
$api_url = "https://api.github.com/repos/$PUBLIC_REPO";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'WordPress/Ventrix-Plugin-Updater');

$api_response = curl_exec($ch);
$api_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "   📊 API Response code: $api_code\n";

if ($api_code === 200) {
    echo "   ✅ Public repository API access successful\n";
    $data = json_decode($api_response);
    if ($data) {
        echo "   📦 Repository: " . $data->full_name . "\n";
        echo "   🔒 Private: " . ($data->private ? 'Yes' : 'No') . "\n";
    }
} else {
    echo "   ❌ Public repository API access failed\n";
}

echo "\n🎯 Summary:\n";
if ($http_code === 200) {
    echo "✅ Server can download from public GitHub repositories\n";
    echo "🔧 The issue is specifically with private repository access\n";
    echo "💡 Solution: Use proper GitHub token with 'repo' permissions\n";
} else {
    echo "❌ Server cannot download from GitHub at all\n";
    echo "🔧 Check server firewall and network configuration\n";
    echo "💡 Contact hosting provider about GitHub access\n";
}

echo "\n💡 Next steps:\n";
if ($http_code === 200) {
    echo "1. Create new GitHub token with 'repo' permissions\n";
    echo "2. Update VENTRIX_GITHUB_TOKEN in wp-config.php\n";
    echo "3. Test the plugin update again\n";
} else {
    echo "1. Contact hosting provider about GitHub access\n";
    echo "2. Check server firewall settings\n";
    echo "3. Verify allow_url_fopen or cURL configuration\n";
}
?> 