## 概念
快速傅里叶变换 (fast Fourier transform), 即利用计算机计算离散傅里叶变换（DFT)的高效、快速计算方法的统称，简称FFT。快速傅里叶变换是1965年由J.W.库利和T.W.图基提出的。采用这种算法能使计算机计算离散傅里叶变换所需要的乘法次数大为减少，特别是被变换的抽样点数N越多，FFT算法计算量的节省就越显著。

本文主要从一个探索者的角度浅析快速傅里叶变换的一些精妙思想、
## 思想

### 问题描述 ：
给定两个多项式分别为n和m阶
![](https://cdn.nlark.com/yuque/__latex/a3a03f49fe009d5c27f631ffd99eec9b.svg#card=math&code=A%28x%29%3D%5Csum_%7Bi%3D0%7D%5E%7Bn%7Da_ix%5Ei%2CB%28x%29%3D%5Csum_%7Bi%3D0%7D%5E%7Bm%7Db_ix%5Ei&id=oSwtz)
求其相乘的表达式 

### 问题分析
#### 多项式表示
首先设计到n-1次多项式的存储方式。
**系数表示法:**朴素的存储方式是系数表示法，即用数组依次存储n个系数。
**点表示法： **另一种存储方式是用n个点来表示。
下证明该表示法是可以唯一表示该多项式。
将其按照多项式系数展开排布后，中间矩阵是一个范德蒙矩阵。
因此，只要选取的n个点各不相同，范德蒙行列式就不为0，该矩阵就一定可逆。则一定可以找带唯一的系数表示。
如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/816297/1637029557759-54e3a53f-414e-4e37-893d-3dd21e5a569e.png#clientId=u2fa98084-62ab-4&from=paste&height=146&id=uae5dea02&originHeight=276&originWidth=758&originalType=binary&ratio=1&size=82060&status=done&style=none&taskId=u6f056c6d-6e49-4803-aca6-7a3c8804923&width=400)

有了上述两种表示方式，我们可以对比看出。当用系数表达法时，相乘的时间复杂度为O(nm).
当使用点表示法时，相乘的时间复杂度为O(n+m+1)。
因此我们确定解题思路为，将

#### 宏观框架
![image.png](https://cdn.nlark.com/yuque/0/2021/png/816297/1637030078197-1cef7fb6-101c-44b2-8146-24b5f2ffe536.png#clientId=u2fa98084-62ab-4&from=paste&height=812&id=uadbf586a&originHeight=812&originWidth=1503&originalType=binary&ratio=1&size=316147&status=done&style=none&taskId=u3448728e-1f34-42a9-bf22-f6be3410cf9&width=1503)

### Evaluation：coeff -> value
该步骤主要是确定选取的点，若随机选取n个点，则时间复杂度仍然是O(n^2)级别。如下图所示。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/816297/1637030237138-9f8e8623-0e44-461d-8232-443797036cd2.png#clientId=u2fa98084-62ab-4&from=paste&height=738&id=ud369ce37&originHeight=738&originWidth=1375&originalType=binary&ratio=1&size=328391&status=done&style=none&taskId=u91ca218d-0c15-4328-bc93-47ac2739a9c&width=1375)

因此我们需要寻找到一个方便的点表示方式。最容易想到的即为对称。对于奇函数和偶函数来讲，根据对称我们可以迅速计算出其值。

对于一般的多项式函数，将其拆分后，我们可以获得基函数和偶函数的组合
![image.png](https://cdn.nlark.com/yuque/0/2021/png/816297/1637030443009-3e4887d8-d52a-46a1-9e6b-d5545201f45b.png#clientId=u2fa98084-62ab-4&from=paste&height=434&id=u0c9361b5&originHeight=434&originWidth=1167&originalType=binary&ratio=1&size=173020&status=done&style=none&taskId=u7bb6cd65-899a-4132-91bb-0da141edf90&width=1167)
如此一来，该函数
## 附录1 ：复数复习

**代数形式** ：z=a+bi，（实部虚部）
**运算法则**：复数的加减乘除 
**共轭复数：**a-bi，a+bi
**模长、俯角的计算**
**几何意义：**复数加减：满足平行四边形法则。复数相乘：俯角相加，模长相乘
图形化表示-**复平面** x轴：实部   y轴：虚部
**复数指数幂形式:**
![](https://cdn.nlark.com/yuque/__latex/a63847e55a8094f2aaefd5b324d7edd0.svg#card=math&code=e%5E%7Bi%5Ctheta%7D%3Dcos%5Ctheta%2Bisin%5Ctheta&id=BaFtK)，其位于复平面已远点为圆心，以1为半径的圆上。
（1）证明： 左右泰勒展开
（2）运算法则：
可以根据复数乘法计算其满足
![](https://cdn.nlark.com/yuque/__latex/9b056603f67afaab84fdb4c0744a3632.svg#card=math&code=e%5E%7Bi%28%5Calpha%20%2B%5Cbeta%29%7D%3De%5E%7Bi%5Calpha%7D%2Be%5E%7Bi%5Cbeta%7D&id=UHEFR)
（3）欧拉公式
当![](https://cdn.nlark.com/yuque/__latex/f1ead9b4f2c2394d9cf59de4c69a0dbf.svg#card=math&code=%5Ctheta%3D%5Cpi%20&id=Socbh)时，可得欧拉公式![](https://cdn.nlark.com/yuque/__latex/695d22c26a7cc8aff2fa389f0a388b60.svg#card=math&code=e%5E%7Bi%5Cpi%7D%3Dcos%5Cpi%2Bisin%5Cpi%3D-1&id=gdffr)
一般复数可以表示为![](https://cdn.nlark.com/yuque/__latex/13253a7c3ed362bef9034d06f9ed709b.svg#card=math&code=z%3D%7Cz%7Ce%5E%7Bi%5Ctheta%7D&id=O7v2V),如此表示也可以解释复数乘法的意义。

**复数单位根**
![](https://cdn.nlark.com/yuque/__latex/2dd1f587026863b1b87d32ef15ee7494.svg#card=math&code=w%5En%3D1&id=ws1C2)的n个单位根为复平面单位圆n等分的单位向量
即：![](https://cdn.nlark.com/yuque/__latex/95f59d8f725b9a6ff6f513ef534ca6d9.svg#card=math&code=w%5Ek_n%3De%5E%7B2%5Cpi%5Cfrac%7Bk%7D%7Bn%7Di%7D&id=DXjwY)
证明：欧拉公式 两边2Πk次方，然后n次方开根号即可。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/816297/1637032413610-afbfc415-b8bd-4aff-ae04-664f2b0e0957.png#clientId=u2fa98084-62ab-4&from=paste&height=371&id=u4470f830&originHeight=371&originWidth=565&originalType=binary&ratio=1&size=151564&status=done&style=none&taskId=u1b018ae9-9a11-4424-b27d-d9d6cd0916d&width=565)
## 参考资料

1. [b站 最好的FFT视频参考资料](https://www.bilibili.com/video/BV1za411F76U?from=search&seid=1692280776535530572&spm_id_from=333.337.0.0)
2. [笔记资料](https://www.acwing.com/solution/content/28025/)

[
](https://www.bilibili.com/video/BV1za411F76U?from=search&seid=1692280776535530572&spm_id_from=333.337.0.0)

