# Source transcript: CSE 2211 slides and class notes

This is the source of truth for the study portal's content. The original PDFs (lecture slides,
Raiyan's and Medha's handwritten notes) and the past-paper scans are kept off GitHub; this file is
their text, so the content can be checked without them.

- **Part 1** is the text layer extracted from the lecture slides (figures and formulas that were
  images are not in it).
- **Part 2** is a hand transcription of everything that was only in images: slide figures, formulas
  and worked solutions, and both sets of handwritten notes (page by page, Bangla annotations
  translated to English). `R-xx` = Raiyan's notes page, `M-xx` = Medha's notes page. Notes in
  [brackets] mark discrepancies or slips in the sources.
- The past papers (Fall 2024, Spring 2025) are typed in full in `src/data/pastPapers.js`.

## Part 1: Slide text (extracted)

### ch5_1

```text
  Data Communication
       CSE 2211
    Chapter 5 : Analog
Transmission (Digital to Analog)
5-1 DIGITAL-TO-ANALOG CONVERSION
 Converting digital data to a bandpass analog signal is
  traditionally called digital-to-analog conversion
 It is the process of changing one of the characteristics
  of an analog signal (carrier signal) based on the
  information in digital data.
Figure 5.2 Types of digital-to-analog conversion
    Note
  Bit rate, N, is the number of bits per
second (bps). Baud rate is the number of
                    signal
      elements per second (bauds).
  In the analog transmission of digital
data, the signal or baud rate is less than
         or equal to the bit rate.
              S=Nx1/r bauds
 Where r is the number of data bits per
              signal element.
      Example 5.1
An analog signal carries 4 bits per signal element. If
1000 signal elements are sent per second, find the bit
rate.
Solution
In this case, r = 4, S = 1000, and N is unknown. We can
find the value of N from
      Example 5.2
An analog signal has a bit rate of 8000 bps and a baud
rate of 1000 baud. How many data elements are
carried by each signal element? How many signal
elements do we need?
Solution
In this example, S = 1000, N = 8000, and r and L are
unknown. We find first the value of r and then the value
of L.
    Amplitude Shift Keying (ASK)
   ASK is implemented by changing the amplitude of a carrier
    signal to reflect amplitude levels in the digital signal.
   Both frequency and phase remains constant while the
    amplitude changes.
   In binary ASK, a digital “1” could not affect the signal,
    whereas a digital “0” would, by making it zero.
   Bit duration is the period of time that defines 1 bit.
   The peak amplitude during each bit duration is constant.
Implementation of BASK
  If digital data are presented as a unipolar NRZ digital signal
   with a high voltage of 1 V and a low voltage of 0 V, the
   implementation can achieved by multiplying the NRZ digital
   signal by the carrier signal coming from an oscillator.
  When the amplitude of the NRZ signal is 1, the amplitude of
   the carrier frequency is held;
  when the amplitude of the NRZ signal is 0, the amplitude of
   the carrier frequency is zero.
Bandwidth of ASK
 The bandwidth B of ASK is proportional
  to the signal rate S.
                B = (1+d)S
 “d” is due to modulation and filtering,
  lies between 0 and 1.
Location of Bandwidth
If we have a bandpass channel available, we can choose our
   carrier frequency fc in middle point so that the modulated
   signal occupies that bandwidth.
However, the most significant one are those between    fc  S
                                                                2
And f c  S with fc at the middle.
           2
      Example 5.3
We have an available bandwidth of 100 kHz which
spans from 200 to 300 kHz. What are the carrier
frequency and the bit rate if we modulated our data by
using ASK with d = 1?
Solution
The middle of the bandwidth is located at 250 kHz. This
means that our carrier frequency can be at fc = 250 kHz.
We can use the formula for bandwidth to find the bit rate
(with d = 1 and r = 1).
      Example 5.4
In data communications, we normally use full-duplex
links with communication in both directions. We need
to divide the bandwidth into two with two carrier
frequencies, as shown in Figure. The figure shows the
positions of two carrier frequencies and the
bandwidths. The available bandwidth for each
direction is now 50 kHz, which leaves us with a data
rate of 25 kbps in each direction.
Frequency Shift Keying (FSK)
 In FSK, the frequency of the carrier signal is
  varied to represent binary 1 and 0.
 The frequency of the signal during each
  duration is constant, but changes for the next
  signal element if the data element changes.
 Both peak amplitude and phase remains
  constant.
 In Binary FSK (or BFSK), we can consider two
  carrier frequencies, f1 and f2.
 For example, a “1” could be represented by
  f1=fc +f, and a “0” could be represented by
  f2=fc-f.
Implementation of BFSK
  There are two implementations of BFSK: noncoherent
   and coherent.
  In noncoherent BFSK, there may be discontinuity in
   the phase when one signal element ends and the
   next begins.
  In coherent BFSK, the phase continues through the
   boundary of two signal elements.
Figure Non coherent Binary frequency shift keying
Implementation of Coherent BFSK
  The input to the oscillator is the unipolar NRZ signal.
  When the amplitude of NRZ is zero, the oscillator
   keeps its regular frequency;
  when the amplitude is positive, the frequency is
   increased.
Bandwidth of FSK
                   17
      Example 5.5
We have an available bandwidth of 100 kHz which
spans from 200 to 300 kHz. What should be the carrier
frequency and the bit rate if we modulated our data by
using FSK with d = 1?
Solution
This problem is similar to Example 5.3, but we are
modulating by using FSK. The midpoint of the band is at
250 kHz. We choose 2Δf to be 50 kHz; this means
    Multi level FSK
 We can use more than two frequencies.
 We can use four different frequencies f 1, f2, f3, and f4 to
  send 2 bits at a time. To send 3 bits at a time, we can use
  eight frequencies.
 However, we need to remember that the frequencies need
  to be 2Δf apart.
 For the proper operation of the modulator and demodulator,
  it can be shown that the minimum value of 2Δf needs to be
  S.
 We can show that the bandwidth with d = 0 is
                B = (1+d)xS + (L-1)2f = LxS
      Example 5.6
We need to send data 3 bits at a time at a bit rate of 3
Mbps. The carrier frequency is 10 MHz. Calculate the
number of levels (different frequencies), the baud rate,
and the bandwidth.
Solution
We can have L = 23 = 8. The baud rate is S = 3 Mbps/3 =
1 Mbaud. This means that the carrier frequencies must be
1 MHz apart (2Δf = 1 MHz). The bandwidth is B = 8 ×
1M = 8MHz. Figure 5.8 shows the allocation of
frequencies and bandwidth.
Figure 5.8 Bandwidth of MFSK used in Example 5.6
Phase Shift Keying
 The phase of the carrier is varied to represent two
  or more different signal elements.
 In binary PSK, we have only two signal elements,
  one with a phase of 0°, and the other with a phase
  of 180°.
 Both peak amplitude and frequency remain constant
 The bandwidth requirement, B is:
                     B = (1+d)xS
Implementation of BPSK
 We use the same idea we used for ASK but with a
  polar NRZ signal instead of a unipolar NRZ signal;
 The polar NRZ signal is multiplied by the carrier
  frequency;
 The 1 bit (positive voltage) is represented by a phase
  starting at 0°; the 0 bit (negative voltage) is
  represented by a phase starting at 180°.
Quadrature PSK
 To increase the bit rate, we can code 2 or
  more bits onto one signal element.
 In QPSK, we parallelize the bit stream so that
  every two incoming bits are split up and PSK
  a carrier frequency. One carrier frequency is
  phase shifted 90o from the other - in
  quadrature.
 The two PSKed signals are then added to
  produce one of 4 signal elements. L = 4 here.
Figure 5.11 QPSK and its implementation
Constellation Diagram
 A constellation diagram helps us to define the amplitude
  and phase of a signal when we are using two carriers, one
  in quadrature of the other.
 The X-axis represents the in-phase carrier and the Y-axis
  represents quadrature carrier.
                                                         26
Example
  Show the constellation diagrams for an ASK (OOK),
  BPSK, and QPSK signals.
Solution
 ASK and BPSK carry only one bit per signal. (1-D)
 QPSK carries two bits per signal. (2-D)
ASK (OOK)
  ASK uses only an in-phase carrier.
  Two points are on the X axis.
  Binary 0 has an amplitude of 0 V;
  Binary 1 has an amplitude of 1V.
BPSK
  BPSK uses only in-phase carrier.
  Polar NRZ signal for modulation.
      Two signal types, one with amplitude “+1”and the
       other with amplitude “-1”.
  BPSK has two different signals:
    “1”: Amplitude 1V and in phase.
    “0”: Amplitude 1V and 180 out of phase.
                               0
QPSK
  QPSK uses two carriers: in-phase and quadrature.
  Point 11: two combined signals, both with an amplitude of
 1 V. (“1” in in-phase carrier and “1” in quadrature carrier. )
  Amplitude of the composite 2-bit-data signal is 21/2, and
 the phase is 45°.
  (45°, 135°, -135°, and -45°).
  The amplitude of the carrier to be 1/(21/2) can make the
 final amplitudes 1 V.
      Example 5.7
Find the bandwidth for a signal transmitting at 12
Mbps for QPSK. The value of d = 0.
Solution
For QPSK, 2 bits is carried by one signal element. This
means that r = 2. So the signal rate (baud rate) is S = N ×
(1/r) = 6 Mbaud. With a value of d = 0, we have B = S = 6
MHz.
QAM (Quadrature Amplitude Modultion)
 The minimum bandwidth required for QAM is the same
 as that for ASK and PSK.
                                                      32
Figure 5.14 Constellation diagrams for some QAMs
 (a) Simplest 4-QAM using a unipolar NRZ (0,+V) to
modulate each carrier. Same method for ASK (OOK).
 (b) 4-QAM using polar NRZ, exactly the same as QPSK.
 (c) 4-QAM using a signal with two positive levels for
each carriers.
 (c) 16-QAM constellation of a signal with two positive
and two negative levels for each carriers.
```

### ch5_2

```text
  Data Communication
       CSE 2211
    Chapter 5 : Analog
Transmission (Analog to Analog)
5-2 ANALOG to ANALOG Conversion
  Analog-to-analog conversion is the representation of
  analog information by an analog signal.
  Analog to analog modulation is needed if the
  medium is bandpass in nature or if only a bandpass
  channel is available to us.
Amplitude Modulaton
 ▪ In AM transmission, the amplitude of carrier signal varies
   with the changing amplitudes of the modulating signal.
 ▪ The frequency and phase of the carrier remain the same.
 ▪ Normally implemented by a simple multiplier.
 ▪ Only the amplitude changes to follow variations in the
   information.
 ▪ The modulating signal becomes an envelope to the carrier.
                                                           3
Bandwidth of AM
The bandwidth of an AM signal is equal to twice the
  bandwidth of the modulating signal and covers a range
  centered around the carrier frequency.
                                                     4
AM Band Allocation
■ The bandwidth of an audio signal is usually 5 kHz.
■ An AM radio station needs a bandwidth of 2 x 5 kHz = 10 kHz.
■ FCC allows 10 kHz for each AM station.
■ AM carrier frequency: 530 ~ 1700 kHz (1.7 MHz). How many
AM station??
■ Each station's carrier frequency must be separated by at least
10 kHz (one AM bandwidth) to avoid interference.
■ If one station uses a carrier frequency of 1100 kHz, the next
station's carrier frequency cannot be lower than 1110 kHz.
                                                                  5
Frequency Modulation
■ The frequency of the carrier signal varies with the
changing amplitude of the modulating signal.
■ Amplitude and phase of the carrier signal remain
constant.
■ Normally implemented by a voltage-controlled oscillator
as with FSK.
■ Frequency of the oscillator changes according to the
input voltage (amplitude) of the modulating signal.
                                                            6
Bandwidth of FM
■ Actual bandwidth is difficult to determine exactly.
■ The total bandwidth required for FM can be
determined empirically as BFM= 2(1 + β)B.
■ β is a factor depends on modulation technique with a
common value of 4.
■ The bandwidth of an FM signal, is approximately 10
times the bandwidth of the modulating signal.
                                                        7
FM Bandwidth allocation
■ The bandwidth of a stereo audio (speech and music)
broadcast is almost B = 15 kHz.
■ FCC allows 200 kHz for each station.
   ❑ BFM= 2(1 + β)B, β = 4with some extra guard band.
■ FM carrier frequency ranges from 88 to108 MHz.
   ❑Separated by at least 200 kHz without overlapping.
■ To create more privacy, FCC requires that in a given
area, only alternate bandwidth allocations may be used.
   ❑The others remain unused to prevent any possibility of
   two stations interfering with each other.
■ In spectrum of 88 ~108 MHz, 100potential FM
bandwidths in an area. Only 50can operate at anyone time.
Phase Modulation (PM)
■ The phase of the carrier signal varies with the changing
amplitude of the modulating signal.
■ Amplitude and frequency of the carrier signal remain constant.
■ It can proved mathematically that PM is the same as FM with
one difference.
■ In FM, the instantaneous change in the carrier frequency is
proportional to the amplitude of the modulating signal.
■ In PM, the instantaneous change in the carrier frequency is
proportional to the derivative of the amplitude of the modulating
signal.
                                                                9
Figure 5.20 Phase modulation
Note
The total bandwidth required for PM can
  be determined from the bandwidth
    and maximum amplitude of the
           modulating signal:
            BPM = 2(1 + β)B.
        Where β = 2 most often.
```

### ch6_1

```text
 Data Communication
      CSE 2211
Chapter 6 : Multiplexing-
          FDM
6-1 MULTIPLEXING
  Multiplexing is the set of techniques that allows the
  (simultaneous) transmission of multiple signals
  across a single data link.
     –   The word link refers to the physical path.
     –   The word channel refers to the portion of a link that
         carries a transmission between a given pair of lines.
     –   One link can have many (n) channels.
Figure 6.1 Dividing a link into channels
 In a multiplexed system, n lines share the bandwidth of one link.
 Figure below shows the basic format of a multiplexed system.
 The lines on the left direct their transmission streams to a
 multiplexer (MUX), which combines them into a single stream
 (many-to one).
 At the receiving end, that stream is fed into a demultiplexer
 (DEMUX), which separates the stream back into its component
 transmissions (one-to-many) and directs them to their
 corresponding lines.
Figure 6.2 Categories of multiplexing
Frequency-division multiplexing
•Frequency-division multiplexing (FDM) is an analog technique that
 can be applied when the bandwidth of a link (in hertz) is greater than
 the combined bandwidths of the signals to be transmitted.
•In FDM, signals generated by each sending device modulate different
 carrier frequencies. These modulated signals are then combined into a
 single composite signal that can be transported by the link.
•Channels can be separated by strips of unused bandwidth-guard
 bands-to prevent signals from overlapping.
Multiplexing Process
 Each source generates a signal of a similar frequency range.
 Inside the multiplexer, these similar signals modulate different carrier
 frequencies (f1, f2 and f3).
 The resulting modulated signals are then combined into a single
 composite signal that is sent out over a media link that has enough
 bandwidth to accommodate it.
Demultiplexing Process
The demultiplexer uses a series of filters to decompose the multiplexed
signal into its constituent component signals.
The individual signals are then passed to a demodulator that separates
them from their carriers and passes them to the output lines.
     Example 6.1
Assume that a voice channel occupies a bandwidth of 4
kHz. We need to combine three voice channels into a link
with a bandwidth of 12 kHz, from 20 to 32 kHz. Show the
configuration, using the frequency domain. Assume there
are no guard bands.
Solution
We shift (modulate) each of the three voice channels to a
diﬀerent bandwidth, as shown in Figure 6.6. We use the
20- to 24-kHz bandwidth for the ﬁrst channel, the 24- to
28-kHz bandwidth for the second channel, and the 28- to
32-kHz bandwidth for the third one. Then we combine
them as shown in Figure 6.6.
Figure 6.6 Example 6.1
     Example 6.2
Five channels, each with a 100-kHz bandwidth, are to be
multiplexed together. What is the minimum bandwidth of
the link if there is a need for a guard band of 10 kHz
between the channels to prevent interference?
Solution
For ﬁve channels, we need at least four guard bands. This
means that the required bandwidth is at least
               5 × 100 + 4 × 10 = 540 kHz,
as shown in Figure 6.7.
Figure 6.7 Example 6.2
       Example 6.3
Four data channels (digital), each transmitting at 1
Mbps, use a satellite channel of 1 MHz. Design an
appropriate configuration, using FDM.
Solution
The satellite channel is analog. We divide it into four channels,
each channel having 1M/4=250-kHz bandwidth.
Each digital channel of 1 Mbps must be transmitted over a 250KHz
channel.
Bandwidth of QAM B=(1+d)S); Here, d=0.
r = 4 bits/signal elements
One solution is 16-QAM modulation.
Figure 6.8 Example 6.3
Analog hierarchy
One of these hierarchical systems used
by AT&T is made up of groups,
supergroups, master groups, and jumbo
groups.
Applications of FDM-AM and FM radio broadcasting
A very common application of FDM is AM and FM radio
broadcasting.
Radio uses the air as the transmission medium.
A special band from 530 to 1700 kHz is assigned to AM radio.
All radio stations need to share this band.
Each AM station needs 10 kHz of bandwidth.
Each station uses a different carrier frequency, which means it
is shifting its signal and multiplexing.
The signal that goes to the air is a combination of signals.
A receiver receives all these signals, but filters (by tuning)
only the one which is desired.
AM and FM radio broadcasting-Cont.
Without multiplexing, only one AM station could broadcast to
the common link, the air.
However, we need to know that there is physical multiplexer or
demultiplexer here.
The situation is similar in FM broadcasting. However, FM has
a wider band of 88 to 108 MHz because each station needs a
bandwidth of 200 kHz.
Television broadcasting
Another common use of FDM is in television broadcasting.
Each TV channel has its own bandwidth of 6 MHz.
Cellular telephone
•The systems divide the bandwidth that is available to them into
 multiple channels.
•Thus, the telephone connection of one user is assigned one set
 of frequencies for transmission, while, the telephone
 connection of a second user is assigned a second set of
 frequencies.
•First generation cellular telephone systems allocated channels
 using frequency ranges within the 800-to-900 MHz spectrum.
•To be more precise, the 824-to-849-MHz range was used for
 receiving signals from cellular phones (the uplink), while the
 869-to-894-MHz range was used for transmitting to cellular
 phone (the downlink).
Cont.
•To enable a two-way conversation to occur, two channels were
 assigned to each telephone connection.
•Each user is assigned two 30-kHz channels, one for sending
 voice and the other for receiving.
•The voice signal, which has a bandwidth of 3 kHz (from 300 to
 3300 Hz), is modulated by using FM.
•Remember that an FM signal has a bandwidth 10 times that of
 the modulating signal, which means each channel, has 30 kHz
 (10 x 3) of bandwidth.
•Therefore, each user is given, by the base station, a 60-kHz
 bandwidth in a range available at the time of the call.
     Example 6.4
The Advanced Mobile Phone System (AMPS) uses two
bands. The first band of 824 to 849 MHz is used for
sending, and 869 to 894 MHz is used for receiving.
Each user has a bandwidth of 30 kHz in each direction.
How many people can use their cellular phones
simultaneously?
Solution
Each band is 25 MHz. If we divide 25 MHz by 30 kHz, we
get 833.33. In reality, the band is divided into 832
channels. Of these, 42 channels are used for control,
which means only 790 channels are available for cellular
phone users.
Note
   We need to know that there is no
        physical multiplexer
 or demultiplexer here. Multiplexing is
      done at the data-link layer.
```

### ch6_2

```text
 Data Communication
      CSE 2211
Chapter 6 : Multiplexing-
          TDM
Time-division multiplexing
• Time-division multiplexing (TDM) is a digital process that allows
 several connections to share the high bandwidth of a link.
• Instead of sharing a portion of the bandwidth as in FDM, time is
 shared.
• Each connection occupies a portion of time in the link.
• In the figure, portions of signals 1, 2, 3, and 4 occupy the link
 sequentially.
•We can divide TDM into two different schemes: synchronous and
 statistical.
Note
We also need to remember that TDM is,
  in principle, a digital multiplexing
               technique.
Digital data from different sources are
 combined into one timeshared link.
Synchronous TDM
  In synchronous TDM, each input connection has an allotment in
  the output even if it is not sending data.
  The data flow of each input connection is divided into units, and
  the link combines one unit of each connection to make a frame.
  The size of the unit can be 1 bit, or several bits.
  For n input connections, a frame is organized into a minimum of n
  time slots, each slot carrying one unit from each connection.
                                                                      4
Note
   In synchronous TDM, the data rate
of the link is n times faster, and the unit
       duration is n times shorter.
     Example 6.5
In Figure 6.13, the data rate for each one of the 3 input
connection is 1 kbps. If 1 bit at a time is multiplexed (a
unit is 1 bit), what is the duration of (a) each input slot,
(b) each output slot, and (c) each frame?
Solution
We can answer the questions as follows:
a. The data rate of each input connection is 1 kbps. This
   means that the bit duration is 1/1000 s or 1 ms. The
   duration of the input time slot is 1 ms (same as bit
   duration).
     Example 6.5 (continued)
b. The duration of each output time slot is one-third of
   the input time slot. This means that the duration of the
   output time slot is 1/3 ms.
c. Each frame carries three output time slots. So the
    duration of a frame is 3 × 1/3 ms, or 1 ms.
Note: The duration of a frame is the same as the duration
  of an input unit.
      Example 6.6
Figure 6.14 shows synchronous TDM with four 1Mbps
data stream inputs and one data stream for the output.
The unit of data is 1 bit. Find (a) the input bit duration,
(b) the output bit duration, (c) the output bit rate, and (d)
the output frame rate.
Solution
We can answer the questions as follows:
a. The input bit duration is the inverse of the bit rate:
   1/1 Mbps = 1 μs.
b. The output bit duration is one-fourth of the input bit
   duration, or ¼ μs.
     Example 6.6 (continued)
c. The output bit rate is the inverse of the output bit
   duration or 1/(4μs) or 4 Mbps. This can also be
   deduced from the fact that the output rate is 4 times as
   fast as any input rate; so the output rate = 4 × 1 Mbps
   = 4 Mbps.
d. The frame rate is always the same as any input rate. So
   the frame rate is 1,000,000 frames per second.
   Because we are sending 4 bits in each frame, we can
   verify the result of the previous question by
   multiplying the frame rate by the number of bits per
   frame.
Figure 6.14 Example 6.6
      Example 6.7
Four 1-kbps connections are multiplexed together. A unit
is 1 bit. Find (a) the duration of 1 bit before multiplexing,
(b) the transmission rate of the link, (c) the duration of a
time slot, and (d) the duration of a frame.
Solution
We can answer the questions as follows:
a. The duration of 1 bit before multiplexing is 1 / 1 kbps,
   or 0.001 s (1 ms).
b. The rate of the link is 4 times the rate of a connection,
   or 4 kbps.
     Example 6.7 (continued)
c. The duration of each time slot is one-fourth of the
   duration of each bit before multiplexing, or 1/4 ms or
   250 μs. Note that we can also calculate this from the
   data rate of the link, 4 kbps. The bit duration is the
   inverse of the data rate, or 1/4 kbps or 250 μs.
d. The duration of a frame is always the same as the
   duration of a unit before multiplexing, or 1 ms. We can
   also calculate this in another way. Each frame in this
   case has four time slots. So the duration of a frame is
   4 times 250 μs, or 1 ms.
     Example 6.8
Four channels are multiplexed using TDM. If each
channel sends 100 bytes /s and we multiplex 1 byte per
channel, show the frame traveling on the link, the size of
the frame, the duration of a frame, the frame rate, and
the bit rate for the link.
Solution
The multiplexer is shown in Figure 6.16. Each frame
carries 1 byte from each channel; the size of each frame,
therefore, is 4 bytes, or 32 bits. Because each channel is
sending 100 bytes/s and a frame carries 1 byte from each
channel, the frame rate must be 100 frames per second.
The bit rate is 100 × 32, or 3200 bps.
Figure 6.16 Example 6.8
     Example 6.9
A multiplexer combines four 100-kbps channels using a
time slot of 2 bits. Show the output with four arbitrary
inputs. What is the frame rate? What is the frame
duration? What is the bit rate? What is the bit duration?
Solution
Figure 6.17 shows the output (4x100kbps) for four
arbitrary inputs. The link carries 400K/(2x4)=50,000
2x4=8bit frames per second. The frame duration is
therefore 1/50,000 s or 20 μs. The bit duration on the
output link is 1/400,000 s, or 2.5 μs.
Figure 6.17 Example 6.9
Interleaving
■   The process of taking a group of bits from each input line for
    multiplexing is called interleaving.
■   TDM can be visualized as two fast-rotating switches, one on the
    multiplexing side and the other on the demultiplexing side.
■   The switches are synchronized and rotate at the same speed, but in
    opposite directions.
■   On the multiplexing side, as the switch opens in front of a connection,
    that connection has the opportunity to send a unit onto the path. This
    process is called interleaving.
Data Rate Management
■ Not all input links maybe have the same
  data rate.
■ Some links maybe slower. There maybe
  several different input link speeds
■ There are three strategies that can be
  used to overcome the data rate
  mismatch: multilevel, multislot and
  pulse stuffing
Multilevel multiplexing
Multilevel multiplexing is a technique used when the data
rate of an input line is a multiple of others. For example, in
Figure, we have two inputs of 20 kbps and three inputs of 40
kbps. The first two input lines can be multiplexed together to
provide a data rate equal to the last three. A second level of
multiplexing can create an output of 160 kbps.
Multiple-Slot Allocation
Sometimes it is more efficient to allot more than one slot in a
frame to a single input line. For example, we might have an
input line that has a data rate that is a multiple of another
input. In Figure, the input line with a 50-kbps data rate can be
given two slots in the output. We insert a serial-to-parallel
converter in the line to make two inputs out of one.
Pulse Stuffing
Sometimes the bit rates of sources are not multiple integers of
each other. Therefore, neither of the above two techniques can
be applied. One solution is to make the highest input data rate
the dominant data rate and then add dummy bits to the input
lines with lower rates. This will increase their rates. This
technique is called pulse stuffing, bit padding, or bit stuffing.
The input with a data rate of 46 is pulse-stuffed to increase the
rate to 50 kbps. Now multiplexing can take place.
     Example 6.11
Two channels, one with a bit rate of 100 kbps and
another with a bit rate of 200 kbps, are to be multiplexed.
How this can be achieved? What is the frame rate? What
is the frame duration? What is the bit rate of the link?
Solution
We can allocate one slot to the ﬁrst channel and two slots
to the second channel. Each frame carries 3 bits. The
frame rate is 100,000 frames per second because it carries
1 bit from the ﬁrst channel. The bit rate is 100,000
frames/s × 3 bits per frame, or 300 kbps.
    Frame Synchronization
■ To ensure that the receiver correctly reads
  the incoming bits, i.e., knows the incoming bit
  boundaries to interpret a “1” and a “0”, a
  known bit pattern is used between the
  frames.
■ The receiver looks for the anticipated bit and
  starts counting bits till the end of the frame.
■ Then it starts over again with the reception of
  another known bit.
■ These bits (or bit patterns) are called
  synchronization bit(s).
■ They are part of the overhead of
  transmission.
Figure 6.22 Framing bits
     Example 6.10
We have four sources, each creating 250 8-bit characters
per second. If the interleaved unit is a character and 1
synchronizing bit is added to each frame, find (a) the data
rate of each source, (b) the duration of each character in
each source, (c) the frame rate, (d) the duration of each
frame, (e) the number of bits in each frame, and (f) the
data rate of the link.
Solution
We can answer the questions as follows:
a. The data rate of each source is 250 × 8 = 2000 bps = 2
   kbps.
     Example 6.10 (continued)
b. Each source sends 250 characters per second;
   therefore, the duration of a character is 1/250 s, or
   4 ms.
c. Each frame has one character from each source,
   which means the link needs to send 250 frames per
   second to keep the transmission rate of each source.
d. The duration of each frame is 1/250 s, or 4 ms. Note
   that the duration of each frame is the same as the
   duration of each character coming from each source.
e. Each frame carries 4 characters and 1 extra
   synchronizing bit. This means that each frame is
   4 × 8 + 1 = 33 bits.
DS hierarchy
Telephone companies implement TDM through a hierarchy of
digital signals, called digital signal (DS) service or digital
hierarchy. Figure shows the data rates supported by each
level.
Cont.
A DS-0 service is a single digital channel of 64 kbps.
DS-1 is a 1.544-Mbps service; 1.544 Mbps is 24 times 64 kbps
plus 8 kbps of overhead. It can be used as a single service for
1.544-Mbps transmissions, or it can be used to multiplex 24
DS-0 channels or to carry any other combination desired by
the user that can fit within its 1.544-Mbps capacity.     28
Cont.
DS-2 is a 6.312-Mbps service; 6.312 Mbps is 96 times 64 kbps
plus 168 kbps of overhead. It can be used as a single service
for 6.312-Mbps transmissions; or it can be used to multiplex 4
DS-l channels, 96 DS-0 channels, or a combination of these
service types.
                                                         29
Cont.
DS-3 is a 44.376-Mbps service; 44.376 Mbps is 672 times 64 kbps plus
1.368 Mbps of overhead. It can be used as a single service for
44.376-Mbps transmissions; or it can be used to multiplex 7 DS-2
channels, 28 DS-l channels, 672 DS-0 channels, or a combination of
these service types.
DS-4 is a 274.176-Mbps service; 274.176 is 4032 times 64 kbps plus
16.128 Mbps of overhead. It can be used to multiplex 6 DS-3 channels,
42 DS-2 channels, 168 DS-l channels, 4032 DS-0 channels, or a
combination of these service types.
                                                                30
Table: DS and T lines rates
•DS-0, DS-l, and so on are the names of services. To implement those
 services, the telephone companies use T lines (T-l to T-4).
•These are lines with capacities precisely matched to the data rates of the
 DS-l to DS-4 services.
•So far only T-l and T-3 lines are commercially available.
•The T-l line is used to implement DS-l; T-2 is used to implement DS-2;
 and so on.
•DS-0 is not actually offered as a service, but it has been defined as a
 basis for reference purposes.
                                                                      31
E1 line
Europeans use a version of T lines called E lines. The two systems are
conceptually identical, but their capacities differ. Table below shows the
E lines and their capacities.
                                                                      32
T Lines for Analog Transmission
•T lines are digital lines designed for the transmission of digital
 data, audio, or video.
•However, they also can be used for analog transmission
 (regular telephone connections), provided the analog signals
 are first sampled, then time-division multiplexed.
•The possibility of using T lines as analog carriers opened up a
 new generation of services for the telephone companies.
•Earlier, when an organization wanted 24 separate telephone
 lines, it needed to run 24 twisted-pair cables from the
 company to the central exchange.
•Today, that same organization can combine the 24 lines into
 one T-l line and run only the T-l line to the exchange.
                                                              33
T Lines for Analog Transmission-Cont.
•The frame used on a T-l line is usually 193 bits divided into 24 slots of 8
 bits each plus 1 extra bit for synchronization (24 × 8+ 1 = 193).
•In other words, each slot contains one signal segment from each
 channel; 24 segments are interleaved in one frame.
•If a T-l line carries 8000 frames/sec(One frame for each sampling
 period)
•The data rate is 1.544 Mbps (193 × 8000 = 1.544 Mbps)-the capacity of
 the line.                                                             34
T-1 frame structure
                      35
Statistical time division multiplexing
                                         36
Inefficient use of Bandwidth in Synchronous Time
Division Multiplexing
•Sometimes an input link may have no data to transmit.
•When that happens, one or more slots on the output link will
 go unused.
•That is wasteful of bandwidth
                                                           37
TDM slot comparison
In synchronous TDM, each input has a reserved slot in the
output frame.
This can be inefficient if some input lines have no data to send.
In statistical time-division multiplexing, slots are dynamically
allocated to improve bandwidth efficiency.
Only when an input line has a slot's worth of data to send is it
given a slot in the output frame.
In statistical multiplexing, the number of slots in each frame is
less than the number of input lines. The multiplexer checks
each input line in round robin fashion; it allocates a slot for
an input line if the line has data to send; otherwise, it skips the
line and checks the next line.
                                                              38
Cont.
        39
Addressing
•Above figure also shows a major difference between slots in synchronous
 TDM and statistical TDM.
•An output slot in synchronous TDM is totally occupied by data; in
 statistical TDM, a slot needs to carry data as well as the address of the
 destination.
•In synchronous TDM, there is no need for addressing; synchronization
 and pre-assigned relationships between the inputs and outputs serve as
 an address.
•In statistical multiplexing, there is no fixed relationship between the
 inputs and outputs because there are no pre-assigned or reserved slots.
•We need to include the address of the receiver inside each slot to show
 where it is to be delivered. The addressing in its simplest form can be n
 bits to define N different output lines with n=log2 N. For example, for
 eight different output lines, we need a 3-bit address.
                                                                     40
Slot Size
Since a slot carries both data and an address in statistical
TDM, the ratio of the data size to address size must be
reasonable to make transmission efficient.
For example, it would be inefficient to send 1 bit per slot as
data when the address is 3 bits.
This would mean an overhead of 300 percent.
In statistical TDM, a block of data is usually many bytes while
the address is just a few bytes.
                                                          41
No Synchronization Bit
There is another difference between synchronous and
statistical TDM, but this time it is at the frame level. The
frames in statistical TDM need not be synchronized, so we do
not need synchronization bits.
                                                       42
Bandwidth
In statistical TDM, the capacity of the link is normally less
than the sum of the capacities of each channel. The designers
of statistical TDM define the capacity of the link based on the
statistics of the load for each channel. If on average only x
percent of the input slots are filled, the capacity of the link
reflects this. Of course, during peak times, some slots need to
wait.
                                                          43
```

### ch7_1

```text
 Data Communication
      CSE 2211
Chapter 7 : Transmission
     Media (Guided)
Transmission medium is the physical path
between transmitter and receiver.
    Located below the physical layer and are directly controlled
    by the physical layer.
Classes of transmission media
Electromagnetic Spectrum
7-1 GUIDED MEDIA
•Waves are guided along a physical path
•Use a conductor such as a wire or a fiber optic cable to
 move the signal from sender to receiver
•Twisted-pair cables and coaxial cable: use metallic (copper)
 conductors that transport signals in the form of electric
 current
•Optical fiber : transport signals in the form of the light
Twisted-pair cable
  A twisted pair consists of two conductors (normally copper), each
  with its own plastic insulation, twisted together.
  One of the wire used to carry signal and the other as a ground.
  The receiver uses the difference between the two.
  If the two wires are parallel, the effect of interference, noise and
  crosstalk is high.
  Twisting the pair of wire balance the effect of unwanted signal
  and reduce it.
Types of twisted pair
•STP (shielded twisted pair)
   the pair is wrapped with metallic foil to insulate the pair
   from electromagnetic interference
•UTP (unshielded twisted pair)
   each wire is insulated with plastic wrap, but the pair is
   encased in an outer covering
                                                             7
Figure: UTP connector
Applications of Twisted-pair cable
 Used in
 1. Telephone lines to provide voice and data
 channels (local loop)
 2. The DSL lines that are used by the telephone
 companies to provide high-data-rate connections
 3. Local area networks, such as 10-base-T and
 100base-T
Advantages and Disadvantages
•Twisted Pair Advantages
Inexpensive and readily available
Flexible and light weight
Easy to work with and install
•Twisted Pair Disadvantages
Susceptibility to interference and noise
Attenuation problem
    For analog, repeaters needed every 5-6km
    For digital, repeaters needed every 2-3km
Relatively low bandwidth (3000Hz
                                                10
Coaxial cable
  Coax cable carries signals of higher frequency ranges than those
  in Twisted pair cable.
  Instead of having two wires, coax has a central core conductor of
  solid which is, in turn, encased in an outer conductor of metal
  foil, braid, or a combination of the two.
  The outer conductor serves both as a shield against noise and as
  second conductor, which complete the circuit.
Figure: BNC connectors
Applications of Coaxial cable
1.   Analog telephone network where a single cable could carry 10,000
     voice signals. Later it was used in Digital telephone networks
     where cable can carry 600Mbps
2.   Cable TV network: In the traditional cable TV network, the
     entire network used RG-59 coaxial cable.
3.   Traditional Ethernet LANs.
        10-base-2 or “Thin Ethernet”, uses RG-58 coax cable to
           transmit data at 10 Mbps with a range of 185m.
         10-base-5 or “Thick Ethernet”, uses RG-11 to transmit 10
           Mbps with rang of 500 m
Advantages
•Higher bandwidth
   •400 to 600Mhz
   •up to 10,800 voice conversations
•Can be tapped easily (pros and cons)
•Much less susceptible to interference than twisted pair
Disadvantages
•More expensive to install compare to twisted pair cable.
•The thicker the cable, the more difficult to work with.
                                                            14
Fiber-optic cable
  A fiber-optic cable is made of glass or plastic and transmit signals in the form of
  light.
  Light travels in a straight line as long as it is moving through a single uniform
  substance. If a ray of light traveling through one substance enters another substance
  of different density , the ray change direction as shown:
   If the angle of incidence I is less than the critical angle, the ray refracts and moves
   closer to the surface.
   If the angle of incidence is equal to the critical angle, the light bends along the
   interface.
   If the angle is greater than the critical angle, the ray reﬂects (makes a turn) and travels
   again in the denser substance.
Figure 7.11 Optical fiber
   Optical ﬁbers use reﬂection to guide light through a channel.
   A glass or plastic core is surrounded by a cladding of less
   dense glass or plastic.
   The diﬀerence in density of the two materials must be such
   that a beam of light moving through the core is reﬂected oﬀ
   the cladding instead of being refracted into it.
Figure 7.12 Propagation modes
Multimode
 Multimode is so named because multiple beams from a
 light source move through the core in different paths.
 How these beams move within the cable depends on
 the structure of the core.
Multimode Step-index fibre
  In multimode step-index fiber, the density of the core
  remains constant from the centre to the edges.
  A beam of light moves through this constant density in
  a straight line until it reaches the interface of the core
  and the cladding.
Multimode step index
•Some beams in the middle travel in straight lines through the
 core and reach the destination without reflecting and
 refracting.
•Some beams strike the interface of the core and cladding at an
 angle smaller than the critical angle; these beams penetrate
 the cladding and are lost.
•Still other hit the edge of the core at angles greater than the
 critical angle and reflect back into the core and off the other
 side, bouncing back and forth down the channel until they
 reach the destination.
                                                           20
Multimode Graded-index fibre
  A graded-index fiber is one with varying densities.
  Density is highest at the centre of the core and
  decreases gradually to its lowest at the edge.
  The impact of this variable density on the propagation
  of light beams is shown below:
Single Mode
  Single mode uses step-index fiber and a highly focused source
  of light that limits beams to a small range of angles and close
  to the horizontal.
  The single mode fiber itself is manufactured with a smaller
  diameter than that of multimode fibers, with substantially
  lower density.
  The decrease of density results in a critical angle that is close
  enough to 90 degrees to make the propagation of beams almost
  horizontal.
Figure: Fiber construction
                             The outer jacket is made of
                             either PVC or Teﬂon.
                             Inside the jacket are Kevlar
                             strands to strengthen the cable.
                             Kevlar is a strong material used
                             in the fabrication of bulletproof
                             vests.
                             Below the Kevlar is another
                             plastic coating to cushion the
                             ﬁber.
                             The ﬁber is at the center of the
                             cable, and it consists of cladding
                             and core.
Figure: Fiber-optic cable connectors
Subscriber channel (SC) connector is used for cable TV
                                                  Straight-tip (ST) connector is used for connecting cable to
                                                  networking devices.
                    MT-RJ is a connector that is the same size as RJ45
  Applications of Fiber-optic cable
  Used in
1.Cable TV network: hybrid network use a
  combination of optical fiber and coax cable. Optical
  provides the backbone while coaxial cable provide
  the connation to the user.
2.Local area networks such as 100base-FX(fast
  Ethernet) and 1000base-XLANs.
3.Backbone networks because its wide bandwidth
Advantages of fiber-optical
1. Higher Bandwidth
2. Less signal attenuation
3. Immunity to electromagnetic interference (noise)
4. Resistance to corrosive materials. Glass is more
resistance to corrosive material
5. Light weight. Fiber cables are much lighter than
copper cables
6. Greater immunity to tapping: copper cables
create antenna effects that can easily tapped
 Disadvantages of fiber-optical
1. Installation and maintenance. It’s a new technology.
   Its installation and maintenance require expertise
   that is not yet available everywhere.
2. Unidirectional light propagation. If we need
   bidirectional , two fibers are needed.
3. Cost. The cable and the interfaces are more
   expensive than those of other guided media. If the
   demand of BW is not high , often use of optical fiber
   can not be justified
```

### ch7_2

```text
 Data Communication
      CSE 2211
Chapter 7 : Transmission
   Media (Unguided)
7-1 UNGUIDED MEDIA
 Unguided media transport electromagnetic waves
 without using a physical conductor.
 This type of communication is often referred to as
 wireless communication.
 Signals are normally broadcast through free space and
 thus are available to anyone who has a device capable of
 receiving them.
 Electromagnetic spectrum for wireless communication:
Antenna
►   An antenna is an electrical conductor or system
    of conductors
    ► Transmission - radiates electromagnetic energy into
      space
    ► Reception - collects electromagnetic energy from
      space
►   In two-way communication, the same antenna
    can be used for transmission and reception
                                                            3
 Types of Antennas
Isotropic antenna (idealized)
  Radiates power equally in all
  directions.
  The pattern of radiation is sphere
  with the antenna at the center.
 Dipole antennas
   Half-wave dipole antenna (or
   Hertz antenna):
       An antenna having a physical
       length of ½ the wavelength is
       called a hertz antenna or a half
       wave dipole antenna.               4
Dipole antennas
  Quarter-wave vertical antenna
  (or Marconi antenna) :
     An antenna having a physical
     length of 1/4 the wavelength
     is called a Marconi antenna or
     a     Quarter-wave     vertical
     antenna.
 Parabolic Reflector Antenna
    Used in terrestrial microwave
    and satellite applications.
                                       5
Antenna Gain
►   Power output, in a particular direction,
    compared to that produced in any direction by a
    perfect omnidirectional antenna (isotropic
    antenna)
►   G = (power radiated by an antenna)/(power
    radiated by reference antenna)
Effective Area of Antenna
►   Effective area (Ae)
    ►   Related to physical size and shape of antenna
    ►   It is a theoretical value which is a measure of
        how effective an antenna is at receiving power.
                                                          6
►   Relationship between antenna gain and effective area
         ►   G = antenna gain
         ►   Ae = effective area
         ►   f = carrier frequency
         ►   c = speed of light ( 3 × 108 m/s)
         ►   λ = carrier wavelength
    Effective Area and G for Different Types of Antennas
                                                           7
Effective Area and G for Different
Types of Antennas
                                     8
Example
1.   For a parabolic reflective antenna with a diameter of
     2 m, operating at 12 GHz, what is the effective area
     and gain?
                                                             9
Propagation Modes
►   Unguided signals can travel from the source to the
    destination in several ways:
    ► Ground Wave (GW) Propagation: < 3MHz
    ► Sky Wave (SW) Propagation: 3MHz to 30MHz
    ► Effective Line-of-Sight (LOS) Propagation: > 30MHz
                                                           10
Ground Wave Propagation
   Follows contour of the earth.
   Can propagate considerable distances.
   Frequency bands: ELF, VF, VLF, LF, MF.
   Spectrum range: 30Hz ~ 3MHz, e.g. AM radio.
                                                 11
Sky Wave Propagation
Signal reflected from ionized layer of upper
atmosphere back down to earth, which can travel a
number of hops, back and forth between ionosphere
and earth’s surface.
HF band with intermediate frequency range: 3MHz ~
30MHz.                                              12
Example International broadcast.
 Line-of-Sight Propagation
 Above 30 MHz, neither ground wave nor sky wave propagation
modes operate, and communication must be by line of sight
(LOS)
For satellite communication, signal above 30 MHz not reflected
by ionosphere.
For ground communication, antennas within effective LOS due to
refraction.
Frequency bands: VHF, UHF, SHF, EHF, Infrared, optical light     13
Spectrum range : 30MHz ~ 900THz.
    LOS calculations
                               dr
                          do
                                                 optical horizon
                                                radio horizon
                               earth
             h
►   What is the relationship between h and d ?
     – For optical LOS:            where
                                     h = antenna height (m)
                                         d = distance between
     – For effective or radio LOS:           antenna and horizon (km)
                                         K = adjustment factor for14
                                             refraction, K = 4/3
  LOS calculations (2)
                        dmax
       Tx                                          Rx
       h1                      eart                h
                               h                       2
• What is the Maximum distance between two antennas
  for LOS propagation ?
                where       h1 = height of antenna 1       15
                         h2 = height of antenna 2
    Example (1)
                 Tx                dmax
                                                    Rx
                                                          h = 0m
            h=                            eart
            100m                          h
►   What is the maximum distance between two antennas for LOS
    transmission if one antenna is 100m and the other is at ground level?
      Solution:
                                                                   16
   Example (2)
       Tx                dmax =
                         41km                      Rx
        h1                   eart
                                                   h2=10m
                             h
• Now, suppose the receiving antenna is 10m high, what is the
  height of the transmitting antenna in order to achieve same
  distance above?
                                                         17
                                             (Saving over 50m)
Problems
1.   Find the optimum distance from the ground level
     for a half-wave dipole antenna of frequency 15
     MHz.
2.   Determine the height of an antenna for a TV
     station that must be able to reach customers up to
     80 km away.
                                                   18
                                                          18
Wireless Transmission Waves
Radio Waves
  Electromagnetic waves ranging in frequencies
  between 3 kHz and 1 GHz are normally called
  radio waves.
  Use omnidirectional antennas that send out signals
  in all directions.
  Propagate in the sky mode, can travel long
  distances.
  Can penetrate through walls.
  Example- AM and FM radio, television.
Micro Waves
  Electromagnetic waves having frequencies between
  1 GHz and 300 GHz are called microwaves.
  Microwave propagation is line-of-sight.
  Very high-frequency microwaves cannot penetrate
  walls.
  Use unidirectional antennas that send out signals in
  one direction.
  Example- cellular phones, satellite networks, and
  wireless LANs
Infrared
   Infrared waves, with frequencies from 300 GHz to
   400 THz (wavelengths from 1 mm to 770 nm), can
   be used for short-range communication.
   Having high frequencies, cannot penetrate walls.
   This advantageous characteristic prevents
   interference between one system and another.
   Infrared signals can be used for short-range
   communication in a closed area using line-of-sight
   propagation.
```

### ch8_1

```text
Data Communication
     CSE 2211
Chapter 8: Switching
    Why Switching?
►   A network is a set of connected devices. Some of the
    conventional ways of interconnecting devices are:
    a)   Point-to point connection between devices as in a mesh
         topology.
    b)   Connection between a central device and every other device as
         in star topology.
    c)   Bus topology – not practical if the devices are at great distances.
    All these techniques require extensive                        cabling,
    dependence on a central server or a central bus.
          –   impractical and wasteful when applied to very large
              networks
    The solution to this interconnectivity problem is
    switching.
Switching Network:
►   A switched network consists of a series of interlinked nodes,
    called switches.
►   Switches are devices capable of creating temporary connections
    between two or more devices linked to the switch.
►   In a switched network, some of these nodes are connected to the
    end systems (computers or telephones, for example). Others are
    used only for routing.
                                                          3
Types of Switching Network:
                              4
Circuit Switching
  Circuit-switched network consists of a set of switches
 connected by physical links.
  A connection between two stations is a dedicated path
 made of one or more links.
  Each connection uses only one dedicated channel on each
 link.
  Each link is normally divided into n channels by using
 FDM or TDM.
                                                        5
Key points of Circuit Switching
Circuit switching takes place at the physical layer
Before starting communication, make a reservation for the
resources ( Setup Phase )
   – resources, such as channels (bandwidth in FDM and time slots in
     TDM), switch buffers, switch processing time, switch I/O ports
Data transferred between the two stations are not packetized
(physical layer transfer of the signal).
There is no addressing involved during data transfer. The
switches route the data based on their occupied band (FDM)
or time slot (TDM).
There is end-to-end addressing used during the setup phase
                                                                       6
  Three phases of Circuit Switching
• Setup Phase
   – Before the two parties can communicate, a dedicated circuit needs to be
     established.
   – connection setup means creating dedicated channels between the switches.
   – end-to-end addressing is required for creating a connection between two
     end systems. These can be, for example, the addresses of the computers
     assigned by the administrator in a TDM network, or telephone numbers in
     an FDM network.
• Data Transfer Phase
   – After the establishment of the dedicated circuit (channels), the two parties
     can transfer data
• Teardown Phase
   – When one of the parties needs to disconnect, a signal is sent to each switch
     to release the resources                                                       7
8
9
Efficiency of Circuit Switching
►    Efficiency are not as efficient as the
    other two types of networks because
    resources are allocated during the
    entire duration of the connection and
    are unavailable to other connections.
                                              10
Delay of Circuit Switching
• Delay caused by the setup is the sum of four parts:
   – the propagation time of the source computer request (slope of the first gray box),
   – the request signal transfer time (height of the first gray box),
   – the propagation time of the acknowledgment from the destination computer (slope of the second gray box),
   – the signal transfer time of the acknowledgment (height of the second gray box).
• The delay due to data transfer is the sum of two parts:
   – the propagation time (slope of the colored box)
   – data transfer time (height of the colored box), which can be very long.
• The delay due to the time needed to tear down the circuit.
                                                                                               11
    Message Switching
►   With message switching there is no need to
    establish a dedicated path between two stations.
►   When a station sends a message, the destination
    address is appended to the message.
►   Each node receives the entire message, stores it in
    its buffer, and then transmits the message to the
    next node.
►   A message will only be delivered if the next hop
    and the link connecting it are both available,
    otherwise it’ll be stored indefinitely.
►   This type of network is called a store-and-forward    12
    network.
Packet Switching
                   13
Packet Switching
►   In packet switching network, a message is broken into small parts,
    called packets.
►   Each packet is tagged with appropriate source and destination
    addresses.
►   There is no resource allocation for a packet. This means that there
    is no reserved bandwidth on the links, and there is no scheduled
    processing time for each packet. Resources are allocated on
    demand
►   Packets are generally accepted onto the network on a first-come,
    first-served basis. If the network becomes overloaded, packets are
    delayed or discarded (``dropped‘’).
►   There are two methods of packet switching: Datagram and virtual
    circuit.                                                      14
Datagram Networks
►   In a datagram network, each packet is
    treated independently of all others.
►   Even if a packet is part of a multipacket
    transmission, the network treats it as
    though it existed alone.
►   Packets in this approach are referred to as
    datagrams.
►   Datagram switching is normally done at the
    network layer.
►   The switches in a datagram network are
    traditionally referred to as routers.
►   The datagram networks are sometimes
    referred to as connectionless networks.
Routing Table
►   If there are no setup or teardown phases, how are the
    packets routed to their destinations in a datagram
    network?
►   Each switch has a routing table which is based on the
    destination address.
►   The destination addresses and the corresponding
    forwarding output ports are recorded in the tables
►   Every packet in a datagram network carries destination
    address of the packet.
►   The routing table is consulted to find the corresponding
    port through which the packet should be forwarded.
Efficiency
►   Better than that of a circuit-switched network
►   Resources are allocated only when there are packets to be
    transferred
►   If a source sends a packet and there is a delay of a few
    minutes before another packet can be sent, the resources can
    be reallocated during these minutes for other packets from
    other sources.
Delay
►   There are no setup and teardown phases, each packet may experience a wait at a
    switch before it is forwarded.
►   Since not all packets in a message necessarily travel through the same switches, the
    delay is not uniform for the packets of a message.
►   If the packet travels through two switches, there are three transmission times (3T),
    three propagation delays (slopes 3τ of the lines), and two waiting times (w1 + w2).
►   We ignore the processing time in each switch. The total delay is
►   Total delay = 3T + 3τ + w1 + w2
Virtual-Circuit Networks
►   It is a cross between a circuit-switched network and a datagram
    network.
►   As in a circuit-switched network, there are setup and teardown phases.
►   Resources can be allocated during the setup phase, as in a
    circuit-switched network, or on demand, as in a datagram network.
►   As in a datagram network, data are packetized and each packet carries
    an address in the header.
►   All packets follow the same path established during the connection.
►   A virtual-circuit network is normally implemented in the data link
    layer
       – circuit-switched network is implemented in the physical layer
       – and a datagram network in the network layer.
Addressing of VC
►   Global Addressing
    – A source or a destination needs to have a global address that can be
      unique and is used only to create a virtual-circuit identifier
►   Virtual-Circuit Identifier
    – The identifier that is actually used for data transfer is called the VCI
    – VCI does not need to be a large number since each switch can use its own
      unique set of VCIs
Three Phases of VC
►   Setup phase:
    – the source and destination use their global addresses to help
      switches make table entries for the connection
►   Data transfer phase:
    – occurs between these two phases.
►   Teardown phase:
    – the source and destination inform the switches to delete the
      corresponding entry
Setup phase (Setup Request)
Setup phase (Acknowledgement)
Setup phase (Acknowledgement)
Data transfer Phase
Teardown Phase
  In this phase, source A, after sending all frames to B,
  sends a special frame called a teardown request.
  Destination B responds with a teardown conﬁrmation
  frame.
  All switches delete the corresponding entry from their
  tables.
Efficiency of VC
    Resource reservation in a virtual-circuit network can be
   made during the setup or on-demand during the data
   transfer phase
        – in ﬁrst case, the delay for each packet is the same
        – in second case, each packet may encounter
           diﬀerent delays
    Big advantage: even if resource allocation is on demand,
   The source can check the availability of the resources.
Delay in VC
 One-time delay for setup (in two direction)
 One-time delay for teardown (in one direction)
 If resources are allocated during setup phase, there is no
 wait time for individual packets.
                                                     The packet is traveling through two
                                                     switches (routers). There are three
                                                     transmission times (3T ), three propagation
                                                     times (3τ), data transfer depicted by the
                                                     sloping lines, a setup delay (which includes
                                                     transmission and propagation in two
                                                     directions),
                                                     Total delay =
                                                     3T+ 3τ + setup delay + teardown delay
                                                     ignore the processing time in each switch
```

### ch10

```text
Data Communication
     CSE 2211
  Chapter 10 : Error
Detection and Correction
Errors
• Data can be corrupted during transmission.
• For reliable communication, errors must be detected and
 corrected.
• Error detection and correction are implemented either at the
 data link layer or the transport layer of the OSI model.
Types of Errors
                                                          2
Single bit error
  The term single bit error means that only one bit of a given
  data unit (such as a byte, character, data unit, or packet) is
  changed 1 to 0 or from 0 to 1.
                                                            3
Single bit error in Serial Transmission:
  Single-bit errors are the least likely type of error in serial
  data transmission.
  For example, imagine a sender sends data at 1 Mbps. This
  means that each bit lasts only 1µs.
  For a single bit error to occur, the noise must have a
  duration of only 1 µs, which is very rare; noise normally
  lasts much longer than this.
Single bit error in Parallel Transmission:
  However, a single bit error can happen if we are sending
  data using parallel transmission.
  For example, if eight wires are used to send all of the eight
  bits of a byte at the same time and one of the wires is noisy,
  one bit can be corrupted in each byte.                    4
Burst Error
  The term burst error means that two or more bits in the
  data unit have changed from 1 to 0 or 0 to 1.
  The length of the burst is measured from the first bit to the
  last corrupted bit.
  Some bits in between may not have been corrupted.
                                                           5
Burst Error in Serial Transmission
  Burst error is most likely to happen in a serial
  transmission.
  The duration of noise is normally longer than the duration
  of a bit, which means that when noise effects data, it effects
  a set.
  The number of bits affected depends on the data rate and
  duration of noise.
  For example, if we are sending at at 1Kbps, a noise of
  1/100 seconds can effect 10 bits; if we are sending data at
  1Mps, the same noise can affect 10,000 bits.
                                                            6
Error Detection
  Error detection means to decide whether the received data
  is correct or not without having a copy of the original
  message.
  Error detection uses the concept of redundancy, which
  means adding extra bits for detecting errors at the
  destination.
  These redundant bits are added by the sender and removed
  by the receiver.
                                                       7
Error Detection Methods
                          8
Parity Check (Vertical Redundancy Check)
  The most common and least expensive mechanism
  Single bit is added to a block
  Two schemes:
 ❑Even parity – Maintain even number of 1s
     E.g., 1011 → 10111
 ❑Odd parity – Maintain odd number of 1s
     E.g., 1011 → 10110
                                                  9
                 Example 1
Suppose the sender wants to send the word world. In
ASCII the ﬁve characters are coded as an 7-bit binary
word
1110111 1101111 1110010 1101100 1100100
The following shows the actual bits sent
11101110 11011110 11100100 11011000 11001001
                 Example 2
Now suppose the word world in Example 1 is received by
the receiver without being corrupted in transmission.
11101110 11011110 11100100 11011000 11001001
The receiver counts the 1s in each character and comes up
with even numbers (6, 6, 4, 4, 4). The data are accepted.
                  Example 3
Now suppose the word world in Example 1 is corrupted
during transmission.
11111110 11011110 11101100 11011000 11001001
The receiver counts the 1s in each character and comes up
with even and odd numbers (7, 6, 5, 4, 4). The receiver
knows that the data are corrupted, discards them, and asks
for retransmission.
Vertical Redundancy Check Performance
  VRC can detect all single-bit errors.
  It can also detect burst errors as long as the total number
  of bits changed is odd (1,3,5 etc.).
  Let’s say we have an even-parity data unit where the total
  number of 1s including the parity bit is 6: 1000111011.
  If any three bit change value, the resulting parity will be
  odd and the error will be detected: 1111111011:9,
  0110111011:7, 1100010011:5-all odd.
  The VRC checker would return a result of 1 and the data
  unit would be rejected. The same holds true for any odd
  number of errors.
                                                        13
Vertical Redundancy Check Performance
  Suppose however, that two bits of the data unit are
  changed: 1110111011:6, 1000011010:4.
  In each case the number of 1s in the data unit is still even.
  The VRC checker will add them and return an even number
  although the data unit contains two errors.
  VRC cannot detect errors where the total number of bits
  changed is even.
                                                          14
             Two-dimensional parity
▪ A better approach is the Two-dimensional parity check.
▪ In two-dimensional parity check, a block of bits is divided into
  rows and a redundant row of bits is added to the whole block.
                  Example 4
Suppose the following block is sent:
10101001 00111001 11011101 11100111 10101010
However, it is hit by a burst noise of length 8, and some
bits are corrupted.
10100011 10001001 11011101 11100111 10101010
When the receiver checks the parity bits, some of the bits
do not follow the even-parity rule and the whole block is
discarded.
10100011 10001001 11011101 11100111 10101010
   Two-dimensional parity performance
▪ Two dimensional parity check cannot
  detect burst error if -
  ▪ Two bits in one data unit are damaged
  ▪ Two bits in exactly the same positions in another
    one data unit are also damaged
Cyclic Redundancy Check (CRC)
 ⚫ Used for error checking
 ⚫ Unlike the parity check which is based on
   addition, CRC is based on binary division.
 ⚫ Before sending data ,some calculation are done on
   the data packets to generate a CRC number
 ⚫ The CRC is calculated so the packet ( data + CRC )
   becomes exactly divisible by a predetermined
   number.
 ⚫ When data is received , the packet is divided by
   the number.
                                                        18
Cyclic Redundancy Check (CRC)
 ⚫ If the reminder “0” : data is correct
 ⚫ If the reminder “1” : data has a problem and need to be sent
   again.
 ⚫ CRC Can detect single bit & burst errors.
                                                              19
The CRC Generator (Ex-1)
The CRC generator uses modulo-2 divisions.
                                             20
The CRC Checker (Ex-1)
                         21
The CRC Generator (Ex-2)
The CRC generator uses modulo-2 divisions.
                                             22
The CRC Checker (Ex-2)
                         23
Checksum
 ⚫ A checksum “adds” together “chunks” of data.
    ⚫ A match between receiver checksum and transmitted checksum
      indicates good data.
    ⚫ A mismatch indicates an error has occurred.
 ⚫ Capable of detecting single or burst errors.
 ⚫ It is simple to implement in either hardware or software.
                                                                   24
Checksum-at the sender
•The unit is divided into k sections, each of n bits.
•All sections are added together using one’s complement to get
 the sum.
•The sum is complemented and becomes the checksum.
•The checksum is sent with the data
Checksum-at the receiver
•The unit is divided into k sections, each of n bits.
•All sections are added together using one’s complement to get
 the sum.
•The sum is complemented.
•If the result is zero, the data are accepted: otherwise, they are
 rejected.
                                                             25
Checksum-example-1
                     26
Checksum-example-1
                     27
Checksum-example-1
                     28
      Example- 2
Suppose our data is a list of five 4-bit numbers that we
want to send to a destination. In addition to sending these
numbers, we send the sum of the numbers. For example, if
the set of numbers is (7, 11, 12, 0, 6), we send (7, 11, 12, 0,
6, 36), where 36 is the sum of the original numbers. The
receiver adds the five numbers and compares the result
with the sum. If the two are the same, the receiver assumes
no error, accepts the five numbers, and discards the sum.
Otherwise, there is an error somewhere and the data are
not accepted.
Example- 2
Error Correction
Introduction
  In error correction, we need to know the exact number of
  bits that are corrupted and, more importantly, their
  location in the message.
  Error can be handled in two ways:
      – Receiver can have the sender retransmit the entire
         data unit.
      – The receiver can use an error-correcting code,
         which automatically corrects certain errors.
         (Forward error correction (FEC).
                                                       32
Forward Error Correction
•Consider only a single-bit error in k bits of data
   •k possibilities for an error
   •One possibility for no error
   •possibilities = k + 1
•Add r redundant bits to distinguish these possibilities; we need
               2r ≥ k+1
•But the r bits are also transmitted along with data; hence
                             2r ≥ k+r+1
                                                            33
Hamming Code
• Simple, powerful FEC
• Widely used in computer memory
• Positions of redundancy bits in Hamming code
                                                 34
Calculating Hamming Code
▪ The key to the Hamming Code is the use of extra parity bits to allow
  the identification of a single error. Create the code word as follows:
▪ Mark all bit positions that are powers of two as parity bits. (positions 1,
  2, 4, 8, 16, 32, 64, etc.)
▪ All other bit positions are for the data to be encoded. (positions 3, 5, 6,
  7, 9, 10, 11, 12, 13, 14, 15, 17, etc.)
▪ Each parity bit calculates the parity for some of the bits in the code
  word. The position of the parity bit determines the sequence of bits
  that it alternately checks and skips.
▪ Position 1: check 1 bit, skip 1 bit, check 1 bit, skip 1 bit, etc.
  (1,3,5,7,9,11,13,15,...)
▪ Position 2: check 2 bits, skip 2 bits, check 2 bits, skip 2 bits, etc.
  (2,3,6,7,10,11,14,15,...)
▪ Position 4: check 4 bits, skip 4 bits, etc. (4,5,6,7,12,13,14,15,...)
  Position 8: check 8 bits, skip 8 bits, etc. (8-15,24-31,40-47,...)
▪ Set a parity bit to 1 if the total number of ones in the positions it checks
  is odd. Set a parity bit to 0 if the total number of ones in the positions it
  checks is even.
                                                                             35
Redundant Bit Calculation
                            36
Redundant Bit Calculation
                            37
Redundant Bit Calculation
                            38
```

## Part 2: Image-only content and handwritten notes

### ch5_1
- Fig5.2: D/A conversion -> ASK, FSK, PSK; ASK+PSK -> QAM. Sender digital data -> modulator -> analog signal -> demodulator -> receiver.
- Ex5.1: S = N x 1/r  or  N = S x r = 1000 x 4 = 4000 bps
- Ex5.2: r = N/S = 8000/1000 = 8 bits/baud; r = log2 L -> L = 2^r = 2^8 = 256
- ASK fig: bit rate 5, baud rate 5, 1 signal element per bit. BASK: unipolar NRZ x carrier (multiplier + oscillator fc).
- Location of BW box: r=1, S=N, B=(1+d)S ; occupies fc-S/2 .. fc+S/2
- Ex5.3: B=(1+d) x S = 2 x N x 1/r = 2 x N = 100 kHz -> N = 50 kbps
- Ex5.4 fig: 200..300 kHz, fc1=225, fc2=275, each B=50 kHz -> 25 kbps each direction
- FSK BW slide: two carriers f1,f2 diff 2Δf; BW at each carrier (1+d)S; required BW of BFSK B=(1+d)S+2Δf; min 2Δf should be at least S. Box: r=1,S=N,B=(1+d)S+2Δf
- Coherent BFSK: unipolar NRZ -> VCO (voltage-controlled oscillator)
- Ex5.5: B=(1+d)xS+2Δf=100 -> 2S=50 kHz, S=25 kbaud, N=25 kbps
- Ex5.6 fig: f1..f8 = 6.5,7.5,...,13.5 MHz, fc=10 MHz, BW=8 MHz
- BPSK box: r=1,S=N,B=(1+d)S. BPSK impl: polar NRZ x carrier.
- QPSK fig 5.11: 2/1 converter, oscillator, 90° shift, two multipliers, sum. phases -135,-45,135,45 for 00,10,01,11 ... (fig: bits 00 10 01 11 -> -135, -45, 135, 45)
- Constellation: X in-phase, Y quadrature; length = amplitude, angle = phase. ASK(OOK): 0 at origin, 1 at +1 on X. BPSK: 0 at -1, 1 at +1. QPSK: 11 (45°), 01 (135°), 00 (-135°), 10 (-45°).
- Ex5.7: r=2, S = N x 1/r = 6 Mbaud, d=0 -> B=S=6 MHz
- QAM = combination of ASK and PSK. Min BW for QAM same as ASK & PSK. Fig: 8-QAM bit rate 24 baud rate 8, 3 bits/baud.
### ch5_2
- A/A conversion -> AM, FM, PM. AM impl: multiplier + oscillator; B_AM = 2B. AM fig: BW_t = 2 x BW_m (BW_m modulating signal BW (audio), BW_t total BW (radio), fc carrier).
- AM band 530..1700 kHz, 10 kHz each.
- FM impl: VCO; B_FM = 2(1+β)B. FM band 88..108 MHz, 200 kHz each, alternate "No station".
- PM impl: d/dt then VCO; B_PM = 2(1+β)B, β = 2 most often.
### ch6_1
- Fig6.1: n input lines -> MUX -> 1 link, n channels -> DEMUX -> n output lines.
- Fig6.2: Multiplexing -> FDM (analog), WDM (analog), TDM (digital).
- Mux process: modulators with carriers f1,f2,f3 then + (adder) -> composite. Demux: filters -> demodulators -> baseband analog signals.
- Fig6.6: voice 0-4 kHz each, modulators to 20-24, 24-28, 28-32; combined 20..32; receiver: bandpass filters then shift back to 0-4.
- Ex6.2: 5x100 + 4x10 = 540 kHz.
- Ex6.3 fig6.8: 4x [1 Mbps digital -> 16-QAM -> 250 kHz analog] -> FDM -> 1 MHz. B=(1+d)S, d=0, r=4 -> S = 1Mbps/4 = 250 kbaud = 250 kHz.
- Analog hierarchy (AT&T): 12 voice channels x 4 kHz -> Group 48 kHz (12 voice ch); 5 groups -> Supergroup 240 kHz (60 voice ch); 10 supergroups -> Master group 2.52 MHz (600 voice ch) [240 kHz*10 = 2.40 ... slide says "240 kHz*10 = 2.42 MHz with guard band"]; 6 master groups -> Jumbo group 16.984 MHz (3600 voice ch) ["2.52 MHz*6 = 15.12 MHz with guard band"]. For analog lines, FDM is used. Lower-BW lines -> higher-BW lines; many leased lines -> fewer but bigger channels.
- TV: each channel 6 MHz.
### ch6_2
- Sync TDM fig: data taken from each line every T s; each frame 3 time slots, each slot duration T/3 s.
- Multilevel fig: 20+20 -> 40 kbps, + 3x40 -> 160 kbps. Multislot fig: 50 kbps -> serial-to-parallel -> 2x25, + 3x25 -> 125 kbps (50-kHz input has two slots per frame). Pulse stuffing fig: 50,50, 46->stuffed 50 => 150 kbps.
- Framing bits fig 6.22: sync pattern 1 0 1 alternating per frame (frame1 bit 1, frame2 bit 0, frame3 bit 1).
- DS hierarchy fig: DS-0 64 kbps; DS-1 1.544 Mbps = 24 DS-0; DS-2 6.312 Mbps = 4 DS-1 or 96 DS-0; DS-3 44.376 Mbps = 7 DS-2 or 28 DS-1 or 672 DS-0; DS-4 274.176 Mbps = 6 DS-3 or 42 DS-2.
- DS/T table: DS-1/T-1 1.544 Mbps 24 voice; DS-2/T-2 6.312, 96; DS-3/T-3 44.736 (table) [text says 44.376 - slide inconsistency], 672; DS-4/T-4 274.176, 4032.
- E lines: E-1 2.048 Mbps 30 ch; E-2 8.448, 120; E-3 34.368, 480; E-4 139.264, 1920.
- T lines analog fig: 24 voice channels, 4 kHz each -> PCM (sampling at 8000 samples/s using 8 bits per sample) -> 64,000 bps -> TDM -> T-1 1.544 Mbps = 24 x 64 kbps + 8 kbps overhead.
- T-1 frame: 1 bit + 24 channels x 8 bits = 193 bits; 8000 frames/s = 8000 x 193 bps = 1.544 Mbps.
- Stat TDM fig: lines A-E; synchronous frames have empty slots; statistical slots carry address+data.
- n = log2 N address bits (8 lines -> 3 bits). 1 bit data / 3 bit address = 300% overhead.
### ch7_1
- Classes: Transmission media -> Guided (wired): twisted-pair, coaxial, fiber-optic; Unguided (wireless): free space.
- EM spectrum: twisted pair ~ low freqs up to ~10^6-10^7; coax higher; AM radio (MF), FM radio & TV (VHF), terrestrial & satellite (microwave), infrared, visible light/optical fiber. ELF/VF/VLF/LF/MF/HF/VHF/UHF/SHF/EHF names.
- UTP connector RJ-45 (female/male). Coax BNC connector, BNC T, 50-Ω BNC terminator. Coax layers: inner conductor, insulator, outer conductor (shield), plastic cover.
- Refraction diagram: I < critical -> refraction; I = critical -> bends along interface; I > critical -> reflection.
- Propagation modes: Multimode (step index, graded index), Single mode. Pulse at destination: step index most distorted, graded less, single mode almost undistorted.
- Fiber construction: outer jacket (PVC/Teflon), Du Pont Kevlar for strength, plastic buffer, cladding, glass or plastic core.
- Connectors: SC (cable TV), ST (networking devices), MT-RJ (same size as RJ45).
### ch7_2
- Wireless spectrum: 3 kHz .. 300 GHz radio wave & microwave; 300 GHz .. 400 THz infrared; 400..900 THz light wave.
- Antenna types: isotropic (sphere), half-wave dipole/Hertz (length λ/2), quarter-wave vertical/Marconi (λ/4), parabolic reflector (terrestrial microwave & satellite).
- G = 4πAe/λ² = 4πf²Ae/c²  (c = 3x10^8 m/s, λ carrier wavelength, f carrier freq)
- Table (Type | Ae (m²) | Power gain rel. isotropic): Isotropic λ²/4π | 1; Infinitesimal dipole or loop 1.5λ²/4π | 1.5; Half-wave dipole 1.64λ²/4π | 1.64; Horn, mouth area A 0.81A | 10A/λ²; Parabolic, face area A 0.56A | 7A/λ²; Turnstile (two crossed perpendicular dipoles) 1.15λ²/4π | 1.15.
- Antenna example (2 m dish, 12 GHz): A = πr² = π; Ae = 0.56π; λ = c/f = (3x10^8)/(12x10^9) = 0.025 m; G = (7A)/λ² = (7xπ)/(0.025)² = 35,186; G_dB = 45.46 dB.
- Ground wave < 3 MHz (ELF, VF, VLF, LF, MF; 30 Hz~3 MHz; AM radio). Sky wave 3-30 MHz HF (international broadcast). LOS > 30 MHz (VHF, UHF, SHF, EHF, infrared, optical; 30 MHz ~ 900 THz).
- Optical LOS: d_o = 3.57√h ; radio/effective LOS: d_r = 3.57√(Kh); h antenna height (m), d distance antenna-horizon (km), K = 4/3.
- d_max = 3.57(√(Kh1) + √(Kh2)).
- Ex(1): h1=100, h2=0 -> d_max = 3.57(√(Kh1)+0) = 3.57√(4/3 x 100) = 41 km.
- Ex(2): h2=10, d=41: 41 = 3.57(√(Kh1)+√(4/3 x 10)) -> √(Kh1) = 41/3.57 - √13.33 = 7.84 -> h1 = 7.84²/1.33 = 46.2 m (saving over 50 m).
- Problems (unsolved on slide): (1) optimum distance from ground for half-wave dipole at 15 MHz; (2) height of TV antenna to reach 80 km.
### ch8_1
- Switched networks -> circuit-switched, packet-switched (datagram, virtual-circuit), message-switched.
- Fig: 4 telephones -> FDM switch (0-4 kHz each) -> 0-8 kHz links (example circuit-switched). Fig 8.5 Ex 8.2: 4x8 switch, T-1 line 1.544 Mbps, 4x8 switch.
- Message switching fig: Source -> Store & Forward nodes -> Destination.
- Routing table example: Destination address 1232 -> port 1, 4150 -> 2, 9130 -> 3.
- Datagram delay: Total = 3T + 3τ + w1 + w2 (two switches).
- VC setup example: A (VCI 14) -> Switch1 (in port1 VCI14 -> out port3 VCI66) -> Switch2 (in1 66 -> out2 22) -> Switch3 (in2 22 -> out3 77) -> B (VCI 77). Setup request a-e then ack a-e back fills outgoing VCIs.
- VC delay total = 3T + 3τ + setup delay + teardown delay. Setup delay one-time (two directions), teardown one-time (one direction).
### ch10
- Single-bit fig: sent 00000010 -> received 00001010 (0 changed to 1). Burst fig: length of burst error 8 bits; sent 0100010001000011 received 0101110101100011.
- Error detection fig: data 0010101 -> data+redundancy 0010101|010 -> medium -> receiver OK? yes remove redundancy, no reject.
- Methods: parity check, cyclic redundancy check, checksum.
- Even parity 1011 -> 10111; odd parity 1011 -> 10110. Sender: calculate parity bit 1100001 -> 11000011; receiver count bits, even? accept & drop parity, else reject.
- 2D parity fig: data 1100111 1011101 0111001 0101001 -> rows+parity 11001111 10111011 01110010 01010011, column parities 01010101 -> sent 11001111 10111011 01110010 01010011 01010101.
- 2D Ex4: sent 10101001 00111001 11011101 11100111 10101010 ; received 10100011 10001001 11011101 11100111 10101010 (burst length 8).
- CRC diagram: sender appends n zeros (00..0), divisor n+1 bits, remainder n bits = CRC; receiver divides data+CRC, remainder zero accept, nonzero reject.
- CRC Ex1: dataword 1001, divisor 1011, augmented 1001000, quotient 1010, remainder 110, codeword 1001110. Leftmost bit 0 -> use 0000 divisor. Checker: 1001110 -> syndrome 000, dataword 1001 accepted; 1000110 -> syndrome 011, discarded.
- CRC Ex2: data 100100, divisor 1101, data plus 000 -> quotient 111101, remainder 001; checker 100100001 -> result 000.
- Checksum ex1: 10101001 + 00111001 = sum 11100010, checksum 00011101, sent 10101001 00111001 00011101. Receiver no error: sum 11111111, complement 00000000 OK. Burst length 5 affecting 4 bits: 10101111 11111001 00011101 -> partial sum 1 11000101, carry 1, sum 11000110, complement 00111001 -> corrupted.
- Checksum ex2: (7,11,12,0,6) sum 36 -> wrapped sum 6 (100100: 10 + 0100 = 0110), checksum 9 (1001). Packet 7,11,12,0,6,9. Receiver sum 45 -> wrapped 15 (101101: 10 + 1101 = 1111), checksum 0 -> accept.
- FEC: 2^r >= k+1 ; 2^r >= k+r+1. Table k: r, total: 1:2,3 2:3,5 3:3,6 4:3,7 5:4,9 6:4,10 7:4,11.
- Hamming 11-bit layout: positions 11..1: d d d r8 d d d r4 d r2 r1. r1 covers 1,3,5,7,9,11; r2 covers 2,3,6,7,10,11; r4 covers 4,5,6,7; r8 covers 8,9,10,11.
- Hamming ex: data 1001101 -> r1=1, r2=0, r4=0, r8=1 -> code 10011100101. Received 10010100101 (pos 7 corrupted) -> recheck r8 r4 r2 r1 = 0 1 1 1 -> position 7 in error.
### Raiyan notes (R-xx = page)
- R1-3 Ch1: Communication = sharing information (local / remote). Data = information/message agreed upon by the parties (they decide which data is accepted or rejected). Components: sender, receiver, medium, protocol (+ message). Data = computer generated msg (bits); unicode for representation. Data com types: voice (wire: PSTN; wireless: cell phone, radio, walkie talkie), video (wire: cable TV; wireless: IP TV), data (wire: LAN, MAN; wireless: WiFi). Medium example twisted wire.
- R3 L-2: topics: definition, components (sender, receiver, transmission medium, msg, protocol), data representation, categories, data flow, effectiveness. Simplex -> not both ways; half duplex -> both ways but not at a time; full duplex -> both ways together. Effectiveness: delivery (ensured by address system), accuracy (noise cancel), timeliness (audio & video at same time), jitter (uneven time in packet arrival delay = jitter).
- R4 Network (for large scale communication): end device, intermediate device, link. End device: creates/reads/writes MSG, can access all 7 OSI layers; intermediate device accesses up to 3rd layer, only forwards. Performance measured by delay: propagation delay = D/S sec (D link distance, S speed) = D/(3x10^8 m/s); transmission delay = L/R (L msg size, R data rate, Mbps/kbps); response time: time a website/http server takes to respond.
- R5 Reliability: fast recovery. Security: encryption. Bus -> multipoint.
- R6 Network definition; connection type: point-to-point, multipoint; topology: mesh, star, ring, bus (mesh/star/ring point-to-point, bus multipoint); hybrid topology: (1) star with bus, (2) star with ring (hub, repeaters R, stations S), (3) ring with bus (tap, drop). 802.11 = protocol of how wifi works.
- R7: digital data/analog data -> analog signal (bandpass channel). Bandwidth BW != 0. Digital data -> analog signal: sine wave carrier fc, s(t) = A sin(2πft + φ): vary Amp (ASK), freq (FSK), phase (PSK); improved version -> QAM. Topics: implementation, bandwidth.
- R8: r = number of data elements / number of signal elements. For ASK, FSK, PSK number of signal elements = 1 (binary). S = N x 1/r. r=1: S=N; r=2: S<N. Want less signal elements (r up, S down): many data through less signal element.
- R9: ASK: data element 1, signal 1; n_b = 1, 2^1 = 2 levels (0,1) -> BASK. Input digital signal (unipolar NRZ) x carrier fc from oscillator; fc = A sin(2πft+φ). 1 bit interval = 2 or 3 cycles.
- R10: Alarm periodic -> discrete (f domain); voice non-periodic -> continuous. BW: fl = fc - S/2 = fc - N/2 ; fh = fc + S/2 = fc + N/2 (BASK r=1, S=N). B ∝ S, B=(1+d)S; d=0 Bmin = (1+0)S = N; d=1 Bmax = (1+1)S = 2N.
- R11: Ex5.4 full duplex: 200..300, fc1=225 kHz, fc2=275 kHz, d=1: B1 = 2N, 50k = 2N, N = 25 kbps.
- R12: FSK -> BFSK (n_b=1, 2^1 = 2) and MFSK (n_b=2,3,...). Implementation: noncoherent, coherent. 0 -> low freq, 1 -> high freq. Noncoherent: different phase can continue -> discontinuity; coherent: no discontinuity, continuity on freq. Output: non periodic composite signal.
- R13: Noncoherent impl: unipolar NRZ x multiplier with fc from oscillator; f1 = fc - Δf (0), f2 = fc + Δf (1). Example fc=5 Hz, Δf=2 Hz: f1 = 3 Hz (0), f2 = 7 Hz (1).
- R14: Coherent: unipolar NRZ -> VCO -> output (continuity). BW analysis of BFSK: f1 = fc - Δf, f2 = fc + Δf, f2 - f1 = 2Δf. Max BW: Bmax = ½(1+d)S + ½(1+d)S + 2Δf = (1+d)S + 2Δf  (eqn 1)
- R15 Proof minimum BW: 2Δf = ½(1+d)S + ½(1+d)S = (1+d)S; d=0 -> 2Δf = S (eqn 2). Bmin = (1+0)S + 2Δf = S + S = 2S.
- R16 Ex-1 (BFSK): r=1, N=1 Mbps, S = 1 Mbaud; min BW: 2Δf = S = 1 MHz; fc=10 MHz; f1 = 9.5 MHz, f2 = 10.5 MHz.
- R17 MFSK: n_b=2,3,..; L = 2^nb; Bmax = (1+d)S + (L-1)2Δf; Bmin = (1+0)S + (L-1)S = LS. Ex-2: r=3, L=8, N=3 Mbps, S = N/r = 1 Mbaud, 2Δf = S = 1 MHz, fc = 10 MHz.
- R18 (Ex-2 cont): f5 - f4 = 2Δf = S = 1 MHz; f4 = 9.5, f3 = 8.5, f5 = 10.5, f6 = 11.5 MHz. Header note: "Ch-2, 3-2, 3-3, 4-1, 4-2 analog to digital" (syllabus pointer). MFSK n_b=2, L=4: 00 -> f1, 10 -> f2, 01 -> f3, 11 -> f4 (4 level, 4 frequency).
- R19 PSK (phase vary): BPSK n_b=1, 2^1=2 (0 -> 0°? note: 0 -> 180°, 1 -> 0° in diagram... text says "0 -> 0°, 1 -> 180° start"; slides: 1 bit -> 0°, 0 bit -> 180°. FOLLOW SLIDE). QPSK n_b=2, 2^2=4. Input polar NRZ -> NRZ-L x osc fc -> output non-periodic composite, B=(1+d)S.
- R20 QPSK: n_b=2, L=4; bits split: 1st bit -> M1 with fc1 (0°): 1 -> 0°, 0 -> 180°; 2nd bit -> M2 with fc2 (90° shift): 1 -> 90°, 0 -> 270°. "this problem is solved by constellation diagram".
- R21: 00 -> -135°, 10 -> -45°, 01 -> 135°, 11 -> 45°; amplitude L = √2 V for all (L² = V² + V²). X axis = 1st bit (in phase), Y axis = 2nd bit (quadrature). ASK -> unipolar (0,1 on x axis); BPSK phase 180° apart. 4-QPSK, 16-QPSK (each coordinate gets 4 points).
- R22: ASK + PSK = QAM. In QPSK we can't keep many points on same coordinate (only phase), so we use QAM: same phase, multiple amplitudes -> more bits. QAM -> design: diagram to identify or draw.
- R23 QPSK circuit: 2/1 converter; branch 1 x fc1 (0°): 0 -> 0°?, 1 -> 180 (as written); branch 2 x f2 (90°): 0 -> 90°, 1 -> 270°; Σ. [handwritten mapping conflicts with R20; use R20/slide constellation].
- R24 Quiz-2 (25/8/26): QAM: same phase but 2 amplitudes. 4QAM = PSK (i.e., 4-QAM = QPSK).
- R25 5.2 Analog-to-analog: passband channel -> A/A conversion; application AM in radio. s(t) = A sin(2πft + φ): amp (AM), freq (FM), phase (PM). B_AM = 2B (channel bandwidth is 2x voice bandwidth). fc always in middle.
- R26: AM carrier 530~1700 kHz. Q: total stations in AM? Total BW = 1700 - 530 = 1170 kHz; AM BW_ch = 2 x Bs, Bs = 5 kHz -> 10 kHz; number of AM stations = total BW / signal BW = 1170/10 = 117.
- R27: station 1 spectrum 530..540 kHz, carrier 530+5 = 535 kHz. General: station_n start = (n-1) x 10 kHz + 530 kHz. Ex station 3 = 2x10 + 530 = 550 kHz; spectrum 550..560 kHz; fc3 = 555 kHz.
- R28 FM: positive amplitude -> high freq, negative -> low. B_FM = 2(1+β)Bs, β=4. FM 88..108 MHz -> total BW 20 MHz; audio Bs = 15 kHz; B_FM,ch = 2(1+4) x 15 = 150 kHz; 150 + guard band (50 kHz) = 200 kHz.
- R29: number of FM stations = total BW / signal BW = 20 MHz / 200 kHz = 100 (100 -> only 50 used, 50 unused). Station 1 spectrum 88 MHz ~ 88.2 MHz, carrier fc1 = 88 MHz + 100 kHz = 88.1 MHz. Station_n start = (n-1) x 200 kHz + 88 MHz; station 2: 88.2 MHz, range 88.2~88.4 MHz, fc2 = 88.3 MHz.
- R30: PM: how modulation works, formula (exam pointer).
- R31 Ch-6 (Forouzan): multiple signals in a single line; e.g. multiple users connected over wifi -> one line -> ISP. (i) FDM (analog), (ii) TDM (digital). FDM: link divided into channels by frequency.
- R32 Check-list for FDM math (MUX input lines): 1) are input lines analog or digital? 2) if analog OK 3) if digital convert to analog (ASK, FSK, PSK, QPSK, QAM) 4) find all input line BW (BW formula of used conversion technique) 5) link BW >= input lines BW.
- R33: input bandwidth and link channel bandwidth spectrum differ so input is shifted into the link channel's spectrum (convert with FM or AM). Q: Describe multiplexing technique? Draw diagram: s1(t)+fc1 = modulated sig-1, s2(t)+fc2 = sig-2, s3(t)+fc3 = sig-3 -> composite signal.
- R34 MUX: s1(t)+fc1 ... sn(t)+fcn -> composite. Demultiplexing: composite -> separate channels (filter), remove carrier frequency (demodulator). Draw diagram.
- R35 Ex 6.1: 3 inputs 0-4 kHz, +fc1 (20-24), +fc2 (24-28), +fc3 (28-32); link 20-32 kHz, BW 12 kHz; input total = 12 kHz; fulfils 5 conditions. DEMUX: bandpass filter (20-24) - fc1 -> s1, (24-28) - fc2 -> s2, (28-32) - fc3 -> s3. FM used; here link BW = input BW so no guard band possible.
- R36: if guard band = 1 kHz: 2 guards -> link BW = 12 + 2x1 = 14 kHz (with 14 kHz link guard band can be used). Ex 6.2: link BW = 5x100 + 4x10 = 540 kHz; draw if asked.
- R37 Ex 6.3: if question says use QAM, find the levels. 4 x 1 Mbps -> 16-QAM (250 kHz each) -> MUX, link BW 1 MHz. Input line BW = 1 MHz/4 = 250 kHz. QAM BWmin = (1+d)S = (1+0) N x 1/r = N/r -> r = N/Bandwidth = 1 Mbps / 250 kHz = 4; L = 2^r = 16.
- R38-41 FDM Analog Hierarchy problem: Given guard band BW = 1 kHz, starting spectrum value = 50 kHz. Channel: digital signal with data rate 16 kbps (default voice BW = 4 kHz). Voice channels: group 12, supergroup 60, master group 600, jumbo group 3600. BWmin = (1+0)S = N x 1/r -> r = N/Bmin = 16 kbps / 4 kHz = 4 bits/signal elem; L = 2^4 = 16 (16-QAM per channel). # groups/supergroup = 60/12 = 5; # supergroups/master = 600/60 = 10; # master/jumbo = 3600/600 = 6. Without guard: group 12x4 = 48 kHz; supergroup 48x5 = 240 kHz; master 10x240 = 2.4 MHz; jumbo 6x2.4 = 14.4 MHz (note wrote 13.4 - arithmetic slip).
  Table with guard bands (Hierarchy | #guard bands | guard BW | total BW = ch BW + g.BW): Group: 11 | 11 kHz | 48+11 = 59 kHz, spectrum 50 ~ (50+59) = 50 ~ 109 kHz. Supergroup: 4 | 4 kHz | 5x59+4 = S. Master: 9 | 9 kHz | 10xS+9 = M. Jumbo: 5 | 5 kHz | 6xM+5 = J. Final total BW = J. (n units need n-1 guard bands.)
  Computed: S = 299 kHz, M = 2999 kHz, J = 17999 kHz.
- R42 TDM: time multiplexing; total link BW used for a fixed time. Checklist: 1 check input lines analog/digital; 2 analog -> convert to digital (PCM: sampling, quantization, encoding); 3 find data rate of each input; 4 check all input data rates are same; 5 if different apply data rate management technique.
- R43: 64 kbps data rate -> T: 64 kb in 1 sec -> 1 bit in 1/64k s. Frame holds one slot per input: frame = # of inputs slots; frame duration = T; output time slot = T / # of inputs.
- R44 formulas: (1) input time slot = (1 x # of bits)/input data rate ; (2) output time slot = frame duration (= input time slot) / # of input lines ; (3) frame size = # of output time slots x # of bits in each output slot ; (4) output data rate = # of input lines x data rate per input line ; (5) frame rate = output data rate / frame size ; (6) frame duration = 1/frame rate = input time slot.
- R45: e.g. frame size 3x1; data rate = 3 x input data rate; frame rate = data rate/frame size. Synchronous -> slot kept even if input has no data; statistical -> slot not kept.
- R46 Ex 6.5 (fig 6.13): 3 x 1 kbps, 1 bit at a time: 1k bits in 1 s -> 1 bit T = 1/10^3 = 1 ms; frame duration = input time slot = 1 ms; frame size = 3x1 = 3 bits; output time slot = 1/3 ms; output data rate = 3x1 kbps = 3 kbps; frame rate = 3 kbps/3 bits = 1k frames/s.
- R47 Ex 6.6 (6.14): 4 x 1 Mbps: input time slot = 1/1 Mbps = 1 µs; frame duration T = 1 µs; output slot = T/4 = 1/4 µs; frame size = 4x1 = 4 bits; data rate = 4x1 Mbps = 4 Mbps; frame rate = 4 Mbps/4 bits = 1M frames/s. Duration of 1 bit before multiplexing = input time slot.
- R48 Data rate management: multilevel (multiplexing: add), multislot (demultiplexing: divide), pulse stuffing (adding bits / extra bit adding). Ex 6.11: 100 kbps + 200 kbps (split into 2x100 kbps): T = 1/100 ms = frame duration; frame size 3 bits; output time slot = T/3 = 1/300 ms.
- R49: data rate = 3 x 100 kbps = 300 kbps; frame rate = 300 kbps/3 bits = 100k frames/s. Frame synchronization bit: 1 0 1 pattern; adding an extra bit increases data rate, so overhead.
- R50 Ex 6.10: 250x8 = 2000 bps = 2 kbps; T = 8/2 kbps = 4 ms = input timeslot = frame duration; data rate = 4 x 2 kbps = 8 kbps; frame size = 4 x 8 = 32 bits; frame rate = 8 kbps/32 bits = 250 frames/s; frame size with extra bit = 33 bits; data rate = 250 x 33 = 8250 bps; overhead = 8250 - 8000 = 250 bps.
- R51 Analog to Digital: (slide 33) 1544 kbps/24 = 64.33 kbps -> fraction means overhead. PCM -> sampling, quantization, encoding. (1) Sampling: Nyquist theorem fs = 2 x fh; voice BW 0-4 kHz, fh = 4 -> fs = 2x4 kHz = 8 kHz = 8k samples/s.
- R52: 8 kbps overhead is found in this example (T-1). (2) Quantization: find number of levels and bits only: N = fs x nb ; nb = N/fs = 64 kbps / 8k samples/s = 8 bits ; L = 2^8 = 256 levels. FDM analog hierarchy + TDM -> Quiz-3.
- R53: input line voice -> analog; TDM accepts digital so PCM needed. Digital hierarchy table header: service, line, rate (Mbps), voice ch, group of service, overhead.
- R54 table: DS-1 T-1 1.544 Mbps 24 voice ch, 24 x DS-0, overhead 8 kbps = 1 bit; DS-2 T-2 6.312, 96, 96/24 = 4 x DS-1, overhead 168 kbps = 21 bits; DS-3 T-3 44.736, 672, 672/96 = 7 x DS-2; DS-4 T-4 274.176, 4032, 4032/672 = 6 x DS-3.
- R55: T-1 system: 24 voice lines -> PCM each -> TDM -> DS-1 (24 x DS-0) 1.544 Mbps (24 time slots) -> TDM -> DS-2 (4 x DS-1) 6.312 Mbps. PCM: sampling fs = 2 x fh = 2 x 4k = 8k samples/s; quantization N = fs x nb, nb = N/fs = 64k/8k = 8 bits, L = 2^8 = 256.
- R56: DS-1 = 24 x DS-0 = 24 x 64 kbps = 1536 kbps; table DS-1 = 1544 kbps; overhead = 1544 - 1536 = 8 kbps. Without overhead: frame size = 24 x 8 = 192 bits; frame rate = 1536 kbps/192 bits = 8k frames/s.
- R57: overhead bits = overhead / frame rate = 8k/8k = 1 bit. With overhead frame size = 192+1 = 193 bits; data rate = 8k x 193 = 1.544 Mbps. DS-2 = 96 x DS-0 = 4 x DS-1 = 96 x 64 kbps = 6144 kbps; table 6312 kbps; overhead = 6312-6144 = 168 kbps. Without overhead frame size = 96 x 8 = 768 bits.
- R58: frame rate = 6144k / 768 bits = 8k frames/s; overhead bits = 168k/8k = 21 bits; with overhead frame size = 768 + 21 = 789 bits; data rate = 8k x 789 = 6.312 Mbps.  (note wrote "768 + 2 bits" - typo for 21)
- R59 Problem-2 (datagram -> individual packets): S to R via switches 1, 3, 5, distance 3200 km. Pd = 3200x10^3 m / (2x10^8 m/s) = 0.016 s; Td = 0. delay = Pd + W1 + W3 + W5 = D/S + 3 + 20 + 20. Packet flow order after examining: 3 -> 2 -> 5 -> 4 -> R (packets arrive out of order).
- R60 VC: datagram + circuit switching; setup = request + acknowledge. Setup phase: table Port | VCI | Port | VCI: 1 | 14 | 3 | -, incoming VCI assigned by switch, outgoing port decided by global table (Dest | Port). VCI = 77 assigned by receiver. VCI -> MAC-like address. Teardown phase: local table remove.
- R61 Types of switch (2 types of switch design): Crossbar: any input can talk to any output; non blocking -> everyone can communicate with everyone at the same time. Number of crosspoints = n x m (e.g. 3x4 = 12) ; crosspoint = transistor. 1000x1000 = 1,000,000. Objective: (1) non-blocking system design (2) reduce number of crosspoints. Solution: multistage switch.
- R62 Multistage: N = 200 (200x200), n = 20, k = 4, N/n = 10. 1st stage: 10 switches 20x4; 2nd stage: 4 switches 10x10; 3rd stage: 10 switches 4x20. Crosspoints: 1st = 10(20x4) = 800; 2nd = 4(10x10) = 400; 3rd = 10(4x20) = 800; total = 2000. Single crossbar would need 200x200 = 40000. 2000/40000 = 5%, below 25% so blocking (reducing crosspoints means non-blocking can't be kept).
- R63 (Forouzan) For non-blocking: k >= 2n-1. Example worked: N=200, n=10 -> 20 first-stage switches of 10x19 (k=19), 19 middle switches 20x20, 20 third-stage switches 19x10. 1st stage = 20 x (10x19) = 20 x 190 = 3800; 2nd = 19 x (20x20) = 7600; 3rd = 20 x 190 = 3800; Total = 15200. TSI (time-slot interchange): # of locations = # time slots; location size = # bits per time slot. Diagram: TDM -> RAM (TSI) -> TDM; time-space-time.
- R64 Ch-10: S sends 0110, R gets 0010 -> wrong info due to noise during transmission. Error -> single bit (parallel transmission) / burst (serial transmission).
- R65: serial: S 011011 at 1 Mbps, 1 bit -> 1 µs; noise longer than 1 µs affects multiple bits. parallel: noise > 1 µs on one wire can't affect more than 1 bit (per wire). Q: what is error, types, why single-bit error in parallel, why burst error in serial (exam Q). Burst: S 011011 -> R 001101 (start of error to end of error), length = 4.
- R66: error correction needs position of changed bit identified. sender 01101 -> redundancy 01101|1 for error detection -> receiver. Error detection: parity check, CRC, checksum. Parity check (VRC): even parity (# of 1 even; mention if not given -> assume even), odd parity (# of 1 odd). Sender side (even): dataword 0110 -> codeword 01100; 1000 -> 10001.
- R67 Odd parity sender: 0110 -> 01101, 1000 -> 10000. Receiver (odd): 01101 -> no error; 100011 -> error because count became even. VRC: can't detect even number of errors; detects odd number of errors; good for single bit error.
- R68 2-D parity check (even): data words (ASCII to binary) 1111001 1001101 1100110 1110000; row-wise even parity: 1111001|1, 1001101|0, 1100110|0, 1110000|1; column-wise parity row 0100010|0. Codeword: 11110011 10011010 11001100 11100001 01000100. Receiver recomputes, no error. Modified if error: rows checked, columns marked X where wrong.
- R69 2-D limitation: if errors at the same positions in 2 rows (2 bits each), can't identify.
- R70 CRC: binary format & polynomial format (division). Mult -> AND op, Subt -> XOR op. Binary: data 1001 (n-1... k bits), divisor 1011 (n bits); sender appends 3 zeros (divisor bits - 1): 1001000 / 1011 -> quotient 1010, remainder 110 -> codeword 1001110. Receiver: 1001110 / 1011 -> remainder 000 -> no error.
- R71: received with error 1101101? (110110?) / 1011 -> remainder 111 -> error. CRC most efficient: burst + single error both handled.
- R72 Polynomial: data 1001 = 1x^3 + 0x^2 + 0x + 1 = x^3 + 1. Divisor 1011 = x^3 + x + 1. Data shifted: (x^3+1) x^3 (divisor highest term) = x^6 + x^3. Divide by x^3+x+1: x^6 + x^4 + x^3 -> remainder x^4 ... x^4 + x^2 + x -> remainder x^2 + x. Codeword = x^6 + x^3 + x^2 + x.
- R73 receiver: (x^6 + x^3 + x^2 + x) / (x^3+x+1) quotient x^3 + x, remainder 0 -> no error. Checksum sender side 4-bit (0-15): Data 7,11,12,0,6 (+0 always): sum = 36 = 100100 -> extra 10 wrapped: 0100 + 10 = 0110 = 6 (wrapped sum); checksum = 1001 = 9. Codeword = 7,11,12,0,6,9. Receiver: sum 45 = 101101 -> 1101 + 10 = 1111 wrapped; checksum 0000 -> no error.
- R74: received with error 7,11,12,1,6,9: sum 46 = 101110 -> 1110 + 10 = 10000 -> wrap again 0001; checksum 1110 -> error.
- R75 16-bit checksum (Forouzan) word "Forouzan" ASCII (F=70, o=111, r=114, u=117, z=122, a=97, n=110): Fo = 466F, ro = 726F, uz = 757A, an = 616E, 0000 (checksum placeholder). Sum = 1 8FC6 -> wrapped sum = 8FC7 -> checksum = 7038. (hex: 70/16 = 4 r 6 -> 46; 111 -> 6F; 114 -> 72).
- R76: codeword = Forouzan, 0x7038; receiver checksum zero -> no error. Error correction: receiver discards on error and sends acknowledgement; sender resends (retransmission). If receiver directly corrects error -> FEC (using Hamming code).
- R77 Hamming sender: data 1001101, k = 7 bits; r: 2^r >= k + r + 1 -> r = 4: 2^4 = 16 >= 7+4+1 = 12; codeword = k + r = 11 bits. Positions r at powers of 2 (1,2,4,8). r1 = b3,b5,b7,b9,b11 = 1,0,1,0,1 -> even (three 1s -> odd count, so add 1) r1=1; r2 = b3,b6,b7,b10,b11 = 1,1,1,0,1 -> add 0 (four 1s) r2=0; r4 = b5,b6,b7 = 0,1,1 -> 0; r8 = b9,b10,b11 = 0,0,1 -> 1. Codeword 10011100101. (r1: check 1 skip 1; r2: check 2 skip 2)
- R78: codeword 10011100101 sent with error 10011100111. Recheck: r1 = b1,b3,b5,b7,b9,b11 -> 1 = 1,0,1,0,1 -> 0 ; r2 group (b2,b3,b6,b7,b10,b11) -> 1 = 1,1,1,0,1 -> 1; r4 (b4,b5,b6,b7) 0 = 0,1,1 -> 0; r8 (b8,b9,b10,b11) 1 = 0,0,1 -> 0. r8 r4 r2 r1 = 0 0 1 0 = 2 -> position of error 2; corrected code: invert bit 2 -> 10011100101; drop r positions to get data.
### Medha notes (M-xx)
- M1 (mid recap): Data rate = sample rate x # bits/sample: N = fs x nb. PCM BW: for NRZ r = 1, c = 1/2: BWmin = c x N x 1/r = 1/2 x fs x nb = fs x nb / 2. Ch 5-1 Digital to Analog (27-07-26): analog conversion needs bandpass channel (BW != 0). Digital data -> analog signal by carrier frequency fc: s(t) = A sin(2πft + φ): Amp (ASK), Freq (FSK), Phase (PSK); ASK+PSK -> QAM (quadrature amplitude modulation). r = # data element / # signal element (signal element always 1) = # data element; S = N x 1/r bauds.
- M2: r=1 -> S=N; r=2,3,.. -> S<N. ASK (BASK): nb=1, 2^1 = 2 (0,1); amp varies (0/1), phase & freq constant. Unipolar NRZ x fc = A sin(2πft+φ) from oscillator -> modulated signal; non periodic composite signal -> continuous in freq domain. f_l = fc - S/2 = fc - N/2 ; f_h = fc + S/2 = fc + N/2 (r=1). BW ∝ S, BW = (1+d)S, d = modulation factor; d=0 BWmin = S = N; d=1 BWmax = 2S = 2N. Full duplex: 200-300, B1, B2 each N=?
- M3 (29-07-26) FSK: binary FSK (noncoherent: discontinuity in phase; coherent: continuity in phase) & MFSK (nb = 2,3..; 2^2 = 4: 00 -> f1, 01 -> f2, 10 -> f3, 11 -> f4). Noncoherent BFSK: multiplier, f1 = fc - Δf = 0, f2 = fc + Δf = 1; fc = 5 Hz, Δf = 2 Hz: f1 = 3 Hz, f2 = 7 Hz.
- M4: coherent: unipolar -> VCO -> output (VCO generates low & high freq); phase discontinuity none in coherent. BW analysis max BW: B1 = B2 = (1+d)S, f1 = fc - Δf, f2 = fc + Δf, f2 - f1 = 2Δf; Bmax = 2Δf + ½(1+d)S + ½(1+d)S = (1+d)S + 2Δf (1).
- M5: min BW: 2Δf = ½(1+d)S + ½(1+d)S = (1+d)S = (1+0)N = S = N [for minimum BW d=0, r=1, S=N]; Bmin = (1+0)S + 2Δf = S + S = 2S (2). "Derivation can come in exam". MFSK: r=2, 2^2 = 4; Bmax = (1+d)S + (L-1)2Δf; Bmin = (1+0)S + (L-1)S = LS. Ex: r=3, N=3 Mbps, L=8; S = N x 1/r = 3/3 = 1 Mbaud; f5 - f4 = 2Δf = S = 1 MHz; f4 = 9.5 MHz, f5 = 10.5 MHz (fc = 10 MHz); Bmin = LS = 8 x 1 Mbaud = 8 MHz.
- M6 (30-07-26) PSK: BPSK nb=1, 2^1=2: 1 -> 0°, 0 -> 180°; QPSK nb=2,3...; nb=2 -> 4. Polar NRZ-L x oscillator -> output non-periodic composite signal. BW ∝ S, B = (1+d)S.
- M7 QPSK: nb=2: 00,10,01,11; NRZ-L -> 2/1 converter -> M1 (fc1 0°) and M2 (fc2 90°) -> Σ. 1st bit: 0 -> 180°, 1 -> 0°; 2nd bit: 0 -> 270°, 1 -> 90°. After combining: 00 -> -135°, √2 V; 10 -> -45°, √2 V; 01 -> 135°, √2 V; 11 -> 45°, √2 V -> 4-QPSK. Constellation: X = 1st bit (in phase), Y = 2nd bit (in phase / quadrature); L² = V² + V², L = √(2V²).
- M8: nb=3: 2^3 = 8 -> 8-QPSK (just 3 bits per point); L-QPSK: L = 2^nb; nb=4: 16-QPSK; 256-QPSK -> nb = log2 L = 8: if L is large, phases very difficult — limitation. So PSK + ASK = QAM (same phase with different amp represents). 8-QPSK: phase differs, amp same. 8-QAM: amp vary, same phase. ASK, PSK, QPSK constellation.
- M9 (17-08-26) D/A conversion: 1. Baseband transmission: baseband signal, low pass channel, BW starts from 0. 2. Broadband transmission: bandpass signal, passband channel, BW doesn't start from 0. fc = a periodic sine wave which helps to convert digital data to analog signal. Quiz-2 25-08-26: constellations: ASK (0 at origin, 1 on x), BPSK (0 at -1, 1 at +1), QPSK (01,11,00,10 on circle) = 4-QPSK = 4-QAM; 4QAM (unipolar, all positive) but not 4QPSK; 4 QAM; 16 QAM.
- M10/11 (19-08-26) Ch 5.2 Analog transmission: analog to analog done to send in a specific BW. fc = s(t) = A sin(2πft+φ): AMP (AM), Freq (FM), Phase (PM). AM: positive signal -> proportionally high amp, negative -> proportionally low amp. Final signal non periodic -> freq domain continuous. AM BW_ch = 2 x Bs (channel bw, signal sent bw). FCC (Federal Communication Commission) sets spectrum of AM.
- M12: FCC AM spectrum 530 kHz - 1700 kHz; total 1170 kHz; audio Bs = 5 kHz; channel BW 10 kHz; # AM stations = 1170/10 = 117. Station 1: spectrum 530 - 540 kHz, carrier 530 + 10/2 = 535 kHz. Station n: start = (n-1) x 10 kHz + 530 kHz; n=2: 540 kHz start, end 550 kHz, range 540~550 kHz.
- M13: FM: +ve signal -> high freq, -ve -> low freq. B_FM = 2(1+β)Bs, β=4. FM spectrum 88 - 108 MHz, total 20 MHz. Audio Bs = 15 kHz. Channel BW = 2(1+β)Bs = 2x5x15 = 150 kHz + guard band (50 kHz: unused frequency where nothing passed, so overlap does not occur) = 200 kHz. # FM stations = 20 MHz / 200 kHz = 100.
- M14: St-1 spectrum 88 ~ 88.2 MHz, fc1 = 88.1 MHz; St-n spectrum start = (n-1) x 200 kHz + 88 MHz; St-2: 88.2 ~ 88.4 MHz; fc2 = 88.3 MHz. For PM -> β = 2.
- M15 (24-08-26) Ch-6 Forouzan: multiplexing allows simultaneous transmission of multiple signals in a single data link (physical path). FDM (analog), TDM (digital). Link -> ch1, ch2, ch3 frequency divided. To input to MUX, check: 1 input lines analog/digital 2 if analog OK go to 5 3 if digital convert to analog (ASK, FSK, PSK, QPSK, QAM) 4 find input line BW 5 all input lines BW <= link BW. BW -> a difference value; spectrum -> high and low -> range.
- M16: signals' spectrum range moved to channel's spectrum range by FM modulation; MUX: s1(t)+fc1 = M1(t), s2(t)+fc2 = M2(t), s3(t)+fc3 = M3(t) -> output composite. DEMUX: filter -> M1(t) - fc1 = s1(t) etc (using demodulator). Analog -> BW given; digital -> bit rate given. Ex 6.1 needs guard band but here we cannot; to add guard band 1 kHz we need (n-1) guard bands, link BW must be 12 + (3-1)x1 = 14 kHz.
- M17 Ex 6.2: 5x100 kHz + (5-1) x 10 kHz = 500 + 40 = 540 kHz. Ex 6.3: QAM BW = (1+d)S = (1+0) N x 1/r = N/r (d=0 for Bmin); r = N/Bmin = 1 Mbps/250 kHz = 4; L = 2^4 = 16; input lines BW = 1 MHz/4 = 250 kHz.
- M18-19 (27-08-26) FDM Analog Hierarchy (starts from 50 kHz given, guard 1 kHz given): table Hierarchy level | # of channels | BW: Channel: 1 data 16 kbps | 4 kHz; Group 12 | 12x4 = 48 kHz; Supergroup 60 | 5x48 = 240 kHz; Master 600 | 10x240 = 2400 kHz = 2.4 MHz; Jumbo 3600 | 6x2.4 = 13.4 MHz [slip; = 14.4]. Guard: group 11 (11 kHz), supergroup 4 (4 kHz), master 9 (9 kHz), jumbo 5 (5 kHz). Medha adds guard per level to no-guard BW: 48+11 = 59 kHz (50~109 kHz); 240+4 = 244 kHz (109~353 kHz); 2.4 MHz+9 kHz = 2.409 MHz; 13.4 MHz+5 kHz; "total BW with guard band = 13.4x MHz; spectrum range 50 kHz ~ 16.29 MHz". QAM BW: 4 kHz = 16 kbps x 1/r -> r = 4 bits/signal element (16-QAM). # groups/supergroup = 60/12 = 5; supergroups/master = 10; master/jumbo = 6. (Default voice channel 4 kHz.) [NOTE: Raiyan vs Medha methods differ; arithmetic slips in both]
- M19 TDM (31-08-26): time is divided, not BW. Steps 1-5 as Raiyan. Input time slot = # of bits to be multiplexed / input data rate; frame duration = input time slot = T; output time slot = input time slot / # of input = T / # of input; frame size = # of output slots x # bits/output slot; output/link data rate = # of input x data rate/input.
- M20: frame rate = output data rate / frame size (frames/s). Ex 6.5: T = 1/10^3 = 1 ms; frame size 3x1 = 3 bits; data rate 3x1 kbps = 3 kbps; frame rate 3 kbps/3 bits = 1k frames/s. Ex 6.8: 800 bps each (100 bytes/s); T = 8/800 = 1/100 s; output slot T/4 = 1/400 s; frame size 4x8 = 32 bits; data rate 4x800 = 3200 bps; frame rate 3200/32 = 100 frames/s. Ex 6.9: frame |2|2|2|2|.
- M21 (02-09-26) when data rates are not same: data rate management -> multilevel (multiplexing: 25+25 -> 50), multislot (demultiplexing: 50 -> 25+25), pulse stuffing (add extra bit: 46 -> 50). Ex 6.11: frame size 3 bits; data rate 3x100 kbps = 300 kbps; frame rate = 300 kbps / 3 bits = 100k frames/s; input time slot / frame duration = 1/100k s.
- M22: Interleaving: values are placed on frames and from frames to receiver. Frame synchronization: 1 0 1; if not these values there is error. F1 overhead 1, F2 overhead 0, F3 overhead 1. Ex 6.10: input time slot = 8/2 kbps = 4 ms; data rate 4x2 kbps = 8 kbps; frame size 4x8 = 32 bits before adding overhead; frame rate 8 kbps/32 bits = 250 frames/s; # overhead bits = 250 x 1 bit = 250 bits; after adding overhead frame size 33 bits; data rate = frame rate x frame size = 250 x 33 = 8250 bps; previous 8000 bps; overhead rate = 250 bps.
- M23: 1544/24 = 64.33 kbps (overhead). 24 voice channels -> PCM -> TDM -> T-1 line 1.544. PCM: sampling fs = 2 x fh = 2x4k = 8000 samples/s; quantization N = fs x nb, nb = N/fs = 64 kbps/8000 = 8 bits/sample.
- M24 (03-09-26) Digital hierarchy table: DS-1 T-1 1.544 Mbps 24 voice, 24 x DS-0, overhead 8 kbps, 1 bit; DS-2 T-2 6.312, 96, 4 x DS-1, 168 kbps, 21 bits; DS-3 T-3 44.736, 672, 7 x DS-2; DS-4 T-4 274.176, 4032, 6 x DS-3. Diagram: PCM 64 kbps DS-0 -> TDM DS-1 24 x DS-0 1.544 Mbps -> TDM DS-2 4 x DS-1 6.312 Mbps -> TDM DS-3 7 x DS-2 44.376(?) Mbps -> TDM DS-4 6 x DS-3 274.176 Mbps.
- M25 DS-1: data rate = 24 x DS-0 = 24 x 64 = 1536 kbps; table 1544 kbps; overhead 8 kbps; without overhead frame size 24x8 = 192 bits; frame rate = 1536 kbps/192 = 8k frames/s; overhead bits = 8 kbps / 8k frames/s = 1 bit; with overhead frame size 193 bits; data rate = 8k x 193 = 1.544 Mbps.
- M26 DS-2: 96 x DS-0 = 96 x 64 = 6144 kbps; table 6312; overhead 168 kbps; frame size w/o overhead 96x8 = 768 bits; frame rate 6144/768 = 8k frames/s; overhead bits = 168 kbps/8k = 21 bits; with overhead 768+21 = 789 bits; data rate = 8k x 789 = 6.312 Mbps. Similarly DS-3, DS-4.
- M27 (09-09-26) Ch-8 Switching (Forouzan): switches are interconnected, some connected to end devices. Switched network -> circuit-switched network (voice; delay not accepted; works in 3 phases: connection setup - resource allocate; data transfer - sending info through the allocated resource; teardown - resource free), packet switched network (data transmission, through internet), message switched (not in use). Eg-1: 4 phones (4 kHz each) -> switch -> FDM 8 kHz -> demux -> switch -> 5..8; 4x8 switch -> TDM -> T-1 1.544 Mbps -> demux -> 4x8 switch.
- M28 Circuit switching delay: propagation delay Pd = D/S ; transmission delay Td = L/R. Setup phase = request + acknowledgement = (Pd+Td) + (Pd+Td) = 2Pd + 2Td. Request over links D1, D2, D3: D1/S + D2/S + D3/S + L/R; if A->B distance D: request = D/S + L/R. Data transfer = Pd + Td; teardown = Pd + Td. Problem-1 (setup & teardown): L = 1000 bits, R = 1 Mbps, D = 5000 km, S = 2x10^8 m/s: Pd = 5000x1000 m / 2x10^8 m/s = 25 ms; Td = 1000/1x10^6 = 1 ms. Adv: no delay (during transfer); disadv: delay in setup phase before data transfer.
- M29 (14-09-26) Packet switching 2 methods: datagram (packets travel independently; sender/receiver as needed) & virtual circuit network. Datagram: has table; if destination address in table send to that port, else add new address. Total delay = 3Td + 3Pd + w1 + w2. Problem: S -> (1) -> (3) -> (5) -> R, 3200 km; Pd = D/S = 3200x10^3 m / 2x10^8 m/s; Td ignored; total delay = Pd + Td + w1 + w3 + w5 = D/S + 0 + 3 + 20 + 20.
- M30 Virtual circuit network: circuit-switched + datagram; does allocation virtually unlike circuit switched. Global table, local table; VCI given by switch-1 (from global table) ... VCI 77 at B; req ->, ack <-; then send data through ports; then teardown phase. Total delay = 3Td + 3Pd + setup delay + teardown delay.
- M31 (17-09-26) Circuit switching -> space division -> crossbar, multistage. Crossbar: # crosspoints = n x m = 3x4 = 12; 100x100 = 10000: inefficient due to increase of users, increase of transistors. Multistage total crosspoints = (N/n)(n x k) + k(N/n x N/n) + (N/n)(k x n) = 2kN + k(N/n)^2. N = 200x200, n = 20, k = 4: N/n = 10 stage-1 crossbars 20x4; stage-2 4 crossbars 10x10; stage-3 10 crossbars 4x20: 10(20x4) + 4(10x10) + 10(4x20) = 800 + 400 + 800 = 2000 = 5% of crossbar (40000). Blocking if < 25%; need above 25% to be non-blocking.
- M32 Switch structure: circuit switching -> space division (crossbar, multistage), time division (TSI, TDM bus). Crossbar: users increase -> crosspoints increase -> transistors increase -> inefficient. Multistage 5% -> needs >= 25% to be non-blocking. To make non-blocking: Clos criterion: n = (N/2)^(1/2), k = 2n - 1. For problem: n = (200/2)^(1/2) = 10; k = 2x10 - 1 = 19. Stage-1: N/n = 20 crossbars 10x19 each; Stage-2: k = 19 crossbars 20x20 each; Stage-3: N/n = 20 crossbars 19x10 each. 20(10x19) + 19(20x20) + 20(19x10) = 15200 (= 38% of 40000; note wrote ">= 25%").
- M33 Design multistage switch following Clos criterion for 200x200 (exam Q). Time slot interchange (TSI): with TDM; TDM -> 4321 -> TDM; after switching: control unit reorders (CBAD -> CDAB). TSI -> control unit + RAM (bits stored here). # of locations = # of time slots; location size = # bits / time slot. Time-Space-Time (TST): system non-blocking; crossbar decreases. For 12x12 ... let n=4.
- M34: TST: TSI -> 3x3 crossbar -> TSI (3 inputs per side). number of slots 4; 1st stage total slots = 3x4 = 12; 3rd stage 3x4 = 12; total memory locations = 12 + 12 = 24. Design -> time-space / multistage.
- M35 (21-09-26) Ch-10: S 0110 -> R 0010. Single bit error: only one bit altered 00000010 -> 00001010. Digital transmission -> serial (burst error found), parallel (single bit error found). Serial: 01110 at 1 Mbps, 1 bit -> 1 µs but noise stays more time so more than one bit affected. Parallel: 1 bit affected.
- M36: burst error: error length from starting error to last error. Concept of redundancy: adding extra bit; sender: dataword -> codeword (data + redundancy bits) -> medium -> receiver: codeword -> error detection (OK? no -> reject). Parity check, cyclic redundancy check, checksum. Parity check: sender, even parity: 0010101|0 -> to make even number of 1 add 1? (00101010 -> 1 appended).
- M37: odd parity 0110000 -> append 0 (odd number of 1). Receiver even parity: 10111 -> 4 1s no error; 10110 -> 3 -> error (single bit). 1110110 -> 6 no error; 1110111 -> 7 error; 1111111 -> 8 "no error" but it IS error: can't detect when number of changed bits is even; odd -> can.
- M38 2D (even): rows 1100111|1, 1011101|1, 0111001|0, 0101001|1, column parity 0101010|1 -> codeword 11001111 10111011 01110010 01010011 01010101 (= slide fig). Error example: changed rows flagged x -> error detected.
- M39: 2-D limitation: no error detected but there is an error (two errors in same columns of two rows). CRC binary/polynomial format; given data and divisor (common for sender & receiver). Binary: data 1001, divisor 1011 (n bits) -> add 3 extra bits (n-1): 1001000. MUL: AND, SUB: XOR.
- M40: codeword 1001110; receiver remainder 0 -> no error, otherwise error. Let codeword 1101110 to receiver -> remainder 111 (error).
- M41: polynomial: highest power of divisor multiplied with data. Receiver got x^6 + x^4 + x^2 + x -> M42: divide by x^3+x+1 -> quotient x^3+1, remainder x^2 + 1 (error).
- M42-44 checksum sender/receiver (same as Raiyan), Forouzan 16-bit -> 7038. Retransmission problem: acknowledgement might also get corrupted, then sender gets no ack; again while resend errors may occur. So not efficient; efficient for R to detect error and correct it (FEC).
- M45-46 Hamming: data 1001101, k=7, r=4 (2^r >= k+r+1: 16 >= 12), codeword 11 bits = 10011100101. Receiver 10011000101: r1 group -> 0? ... r8 r4 r2 r1 = 0 1 1 0 = 6 -> 6th position is error, change 6.
