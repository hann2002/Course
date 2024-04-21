#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"
#include "kernel/fs.h"
struct r{
    int d, f;
};

char key;
int f = 0, d = -1;

void tree(char *path, int count)
{
    char buf[55], *p;
    int fd;
    struct dirent de;
    struct stat st;

    if((fd = open(path, 0)) < 0){
        fprintf(2, "%s [error opening dir]\n", path);
        d = 0;
        return;
    }

    if(fstat(fd, &st) < 0){
        fprintf(2, "ls: cannot stat %s\n", path);
        close(fd);
        return;
    }
    if(d == -1 && st.type != T_DIR) {
        fprintf(2, "%s [error opening dir]\n", path);
        d = 0;
        close(fd);
        return;
    }
    printf("%s %d\n", path, count);

    if(st.type == T_DIR){
        d++;
        strcpy(buf, path);
        p = buf+strlen(buf);
        *p++ = '/';
        while(read(fd, &de, sizeof(de)) == sizeof(de)){
            if(de.inum == 0 || strcmp(de.name, ".") == 0 || strcmp(de.name, "..") == 0) continue;
            memmove(p, de.name, DIRSIZ);
            p[DIRSIZ] = 0;
            if(stat(buf, &st) < 0){
                // printf("ls: cannot stat %s\n", buf);
                continue;
            }
            int add = 0;
            for(int i = 0; i < strlen(de.name); i++)
                if(de.name[i] == key) add++;
            tree(buf, count+add);
        }
    }else if(st.type == T_FILE) f++;
    close(fd);
}

int main(int argc, char *argv[]){
    key = argv[2][0];
    int p[2];
    pipe(p);
    int pid = fork();
    if(pid == 0){
        close(p[0]);
        int add = 0;
        for(int i = 0; i < strlen(argv[1]); i++)
            if(argv[1][i] == key) add++;
        tree(argv[1], add);
        struct r re = {d, f};
        if(re.d == -1) re.d = 0;
        write(p[1], &re, sizeof(struct r));
        close(p[1]); 
    }else{
        close(p[1]);
        struct r re;
        read(p[0], &re, sizeof(struct r));
        wait(0);
        printf("\n%d directories, %d files\n", re.d, re.f);
        close(p[0]);
    }
    exit(0);
}
