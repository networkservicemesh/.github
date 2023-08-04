
string="refs/heads/update/go_1.30.8"
f=${string#refs/heads/update/go_}

echo $f

OLD_GO_VERSION=$(grep -F "go-version: " .github/workflows/build-and-test.yaml)
OLD_GO_VERSION=$(echo $OLD_GO_VERSION | sed -e 's/go-version: //g')

echo $OLD_GO_VERSION