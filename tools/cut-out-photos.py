import sys
from PIL import Image
from rembg import remove, new_session
raw="/Users/caralaban/Desktop/Cafe-Website/assets/raw/"
out="/Users/caralaban/Desktop/Cafe-Website/assets/img/"
s=new_session("isnet-general-use")
jobs=[
 ("pastrycoffee.jpg",(60,230,880,930),"latte-leaf.png"),
 ("pastrycoffee.jpg",(880,130,1960,1333),"croissants-board.png"),
 ("mug1.jpg",(300,520,1450,1450),"espresso.png"),
 ("croissant2.jpg",(150,350,1350,1300),"croissant-cut.png"),
 ("macarons.jpg",(200,0,1000,1175),"macarons.png"),
 ("cup3.jpg",(700,370,1260,960),"latte-heart.png"),
]
for src,box,name in jobs:
    im=Image.open(raw+src).convert("RGB").crop(box)
    r=remove(im,session=s,alpha_matting=False)
    bb=r.getbbox()
    if bb: r=r.crop(bb)
    r.thumbnail((1400,1400))
    r.save(out+name,optimize=True)
    print(name,r.size)
