#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define INF INT_MAX

string cmd[3] = {"PLACE ", "POP\n", "PHOTO\n"};
stack<int> s;
stringstream out;
int cnt = 0;

void solve(int l, int r){
    if(l>=r){
        out << cmd[0] << r << '\n'; cnt++;
        out << cmd[2]; cnt++;
        return;
    }
    int mid = (l+r)/2;
    for(int i=r; i>mid; i--){

        out << cmd[0] << i << '\n'; cnt++;
    }
    solve(l, mid);
    for(int i=r; i>=l; i--){

        out << cmd[1]; cnt++;
    }
    for(int i=mid; i>=l; i--){
        out << cmd[0] << i << '\n'; cnt++;
    }
    solve(mid+1, r);
    return;
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n; cin >> n;
    solve(1, n);
    cout << cnt << '\n';
    cout << out.str();

    return 0;
}
