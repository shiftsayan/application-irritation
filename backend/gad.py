# Source: https://data-flair.training/blogs/python-project-gender-age-detection/

import cv2
import math
import base64
import io
from PIL import Image
import numpy as np
import random

def highlightFace(net, frame, conf_threshold=0.7):
    frameOpencvDnn=frame.copy()
    frameHeight=frameOpencvDnn.shape[0]
    frameWidth=frameOpencvDnn.shape[1]
    blob=cv2.dnn.blobFromImage(frameOpencvDnn, 1.0, (300, 300), [104, 117, 123], True, False)

    net.setInput(blob)
    detections=net.forward()
    faceBoxes=[]
    for i in range(detections.shape[2]):
        confidence=detections[0,0,i,2]
        if confidence>conf_threshold:
            x1=int(detections[0,0,i,3]*frameWidth)
            y1=int(detections[0,0,i,4]*frameHeight)
            x2=int(detections[0,0,i,5]*frameWidth)
            y2=int(detections[0,0,i,6]*frameHeight)
            faceBoxes.append([x1,y1,x2,y2])
            cv2.rectangle(frameOpencvDnn, (x1,y1), (x2,y2), (0,255,0), int(round(frameHeight/150)), 8)
    return frameOpencvDnn,faceBoxes

def dataToImage(data):
    data = str(data)
    data = data[data.find(',') + 1:-1].encode()
    f = io.BytesIO()
    f.write(base64.b64decode(data))
    img = Image.open(f)
    return img

def getAge(data):
    image = dataToImage(data)
    frame = np.array(image)
    
    faceProto="opencv_face_detector.pbtxt"
    faceModel="opencv_face_detector_uint8.pb"
    ageProto="age_deploy.prototxt"
    ageModel="age_net.caffemodel"

    MODEL_MEAN_VALUES=(78.4263377603, 87.7689143744, 114.895847746)
    ageList=[3, 6, 10, 18, 28, 40, 50, 60]
    natList=['asian', 'white', 'hispanic or latino', 'black or african american', 'american indian or alaska native', 'white', 'asian', 'native hawaiian or other pacific islander' ]
    random.shuffle(natList)

    faceNet=cv2.dnn.readNet(faceModel,faceProto)
    ageNet=cv2.dnn.readNet(ageModel,ageProto)

    padding=20
    resultImg,faceBoxes=highlightFace(faceNet,frame)
    if not faceBoxes:
        return 0

    for faceBox in faceBoxes:
        face=frame[max(0,faceBox[1]-padding):
                    min(faceBox[3]+padding,frame.shape[0]-1),max(0,faceBox[0]-padding)
                    :min(faceBox[2]+padding, frame.shape[1]-1)]

        blob=cv2.dnn.blobFromImage(face, 1.0, (227,227), MODEL_MEAN_VALUES, swapRB=False)

        ageNet.setInput(blob)
        agePreds=ageNet.forward()
        age=ageList[agePreds[0].argmax()]
        nat=natList[agePreds[0].argmax()]
        return int(age * (0.9 + random.random()/5)), nat

