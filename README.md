### Deployment

Get SSH access from AWS, whenever router restartsor logging next day 
1. Navigate to `EC2` -> `Security Groups` -> `sg-02599b219ad0a4c3d - launch-wizard-2`  [link](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#SecurityGroup:groupId=sg-02599b219ad0a4c3d)
2. Click edit Inbound rules, change the source using dropdown option "My IP"
3. Save Rules

Login to server using termius. 
If using local terminal use below command

```bash
ssh -i path-to-pem-file ubuntu@eionrides.com
```

### Reload the source code (GO live)

```bash
sh /home/ubuntu/reload-eion-web.sh
```

#### If working on different branch

Navigate to source folder

```bash
cd /home/ubuntu/eionridesnew
git checkout <new-branch-name>
sh /home/ubuntu/reload-eion-web.sh
```
















