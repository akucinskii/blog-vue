FROM amazonlinux:latest
# Install python 3.8 as python3
RUN amazon-linux-extras install python3.8 && ln -s /usr/bin/python3.8 /usr/bin/python3 && ln -s /usr/bin/pip3.8 /usr/bin/pip3

RUN yum install -y shadow-utils && yum clean all

ADD requirements.txt requirements.txt
RUN python3 -m pip install --upgrade pip && python3 -m pip install -r requirements.txt

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

ADD  ./api /app/api
