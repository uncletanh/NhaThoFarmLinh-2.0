let poems = [
    {
        title: "Người cô đơn nhất cuộc đời",
        date: "2026-04-20",
        tags: ["loneliness", "sadness", "life"],
        preview: "Người cô đơn nhất cuộc đời / Chẳng một ai rủ đi chơi cuối tuần...",
        insight: "Cảm hứng: Khi một người cô đơn chạm đến đáy của nỗi buồn, sự cô đơn không còn là một trạng thái đáng sợ nữa mà trở thành một thói quen hiển nhiên, lặng lẽ như một dòng sông.",
        content: `Người cô đơn nhất cuộc đời
Chẳng một ai rủ đi chơi cuối tuần
Một mình ngồi ngắm mưa xuân
Chợt thương năm tháng trôi dần qua tay

Người cô đơn nhất đêm ngày
Quanh năm suốt tháng chẳng say bao giờ
Đi ngủ cũng ít khi mơ
Chục năm lẻ bóng bao giờ biết yêu

Người cô đơn mỗi buổi chiều
Phố đông vẫn thấy cô liêu trong lòng
Thoáng nghĩ đến người hằng mong
Nghe nỗi nhớ một dòng sông dâng tràn

Người cô đơn nhất thế gian
Là kẻ tỉnh nhất giữa ngàn người say
Hết xuân, hết cả tháng ngày
Chỉ còn nỗi nhớ vẫn đầy trong tim`
    },
    {
        title: "Trời nóng quá chẳng cần gì",
        date: "2026-04-07",
        tags: ["life", "work", "funny", "summer"],
        preview: "Trời nóng quá chẳng cần gì / Ba mươi sáu độ ừ thì cũng to...",
        content: `Trời nóng quá chẳng cần gì
Ba mươi sáu độ ừ thì cũng to
Mùa hạ ta bớt làm trò
Chẳng cần ai cả vì lo đi làm

Càng ngày ta lại càng tham
Một đồng không đủ lại làm hăng say
Mệt mỏi chẳng làm lung lay
Thức nhiều ngủ ít ta cày toàn tâm

Nhiều người cứ bảo ta hâm
Ừ thì cũng đúng ta ẩm ương ghê
Ngay gần thì lại đi chê
Ở tận xa lắm thì mê đêm ngày

Thủ đô nắng nóng như này
Chi bằng bỏ hết ta bay sang Tàu
Muốn đi tránh nóng? Quý Châu
Muốn tìm hạnh phúc đi đâu bây giờ?`
    },
    {
        title: "Hỏi Gương",
        date: "2026-03-10",
        tags: ["love", "reflection", "poem"],
        preview: "Một cuộc trò chuyện với chiếc gương, khi trái tim không biết nói cùng ai.",
        content: `Gương kia ngự ở trên tay,
Trái tim ấm áp chẳng may lỡ lời.
Nhưng lại chẳng muốn nghỉ ngơi,
Gương kia, hãy giúp ta mời người lên.

Gương kia chớ đừng ngủ quên,
Trái tim ấm nóng chưa quen một mình.
Bảo người xin đừng làm thinh,
Trái tim ấm áp một mình chán ghê.

Gương kia, ta không muốn về,
Trái tim, tâm trí tỉ tê vì người.
Dẫu cho bão táp mưa rơi,
Hải âu chẳng thể xa rời chốn đây.

Gương kia, ta muốn lên mây,
Nhưng sợ rơi xuống, toàn thây không còn.
Trái tim ấm nóng đang ngon,
Tự dưng đáp đất chẳng còn biết rung.

Trái tim vẫn cứ nhớ nhung,
Dẫu cho tâm trí vẫy vùng thoát ra.
Gương kia, hãy nói cho ta,
Mất bao lâu nữa để mà bên em?`
    },
    {
        title: "Tình em như hoa",
        date: "2025-09-04",
        tags: ["love", "nature"],
        preview: "Tình em như hoa / Nở rộ tối ngày...",
        content: `Tình em như hoa
Nở rộ tối ngày
Sơn ca múa hoạ
Hoa theo gió bay
Mai này hoa nở
Là mùa xuân ư?
Vâng, tình yêu vẫn
Âm thầm nơi đây
Dù cho đông đến
Tình em vẫn đầy
Hoa nằm trong hoa
Tay nằm trong tay`
    },
    {
        title: "Hạnh phúc nên quên viết thơ",
        date: "2025-03-31",
        tags: ["life", "reflection"],
        preview: "Hạnh phúc nên quên viết thơ / Hàng đêm mệt quá chẳng mơ tí nào...",
        content: `Hạnh phúc nên quên viết thơ
Hàng đêm mệt quá chẳng mơ tí nào
Chẳng hay dạo này em sao
Còn tôi thì có thế nào, kệ tôi`
    },
    {
        title: "Hương len vào gió",
        date: "2025-03-19",
        tags: ["nature", "love"],
        preview: "Hương len vào gió mỏng manh / Nhẹ như tơ khói, chòng chành giấc mơ...",
        content: `Hương len vào gió mỏng manh
Nhẹ như tơ khói, chòng chành giấc mơ
Trắng tinh vương vấn hồn thơ
Rơi trên mái tóc, đợi chờ ai đây?
Nhành hoa nhỏ bé trong tay
Thoảng qua một thoáng mà say cả đời
Gió đưa nhắc chuyện xa vời
Lặng im chợt thấy mắt ngời sáng soi.`
    },
    {
        title: "Nhà thơ cầm bút",
        date: "2025-03-11",
        tags: ["sadness", "writing"],
        preview: "Nhà thơ cầm bút trên tay / Viết lên trang giấy hôm nay buồn đời...",
        content: `Nhà thơ cầm bút trên tay
Viết lên trang giấy hôm nay buồn đời
Giọt sầu lặng lẽ chơi vơi
Hóa thành con chữ rối bời nỗi đau.
Viết lên trang giấy mình rầu
Mực chưa kịp đậm mà đầu đã ngơ
Ngòi bút run rẩy, hồn mơ
Viết hoài chỉ thấy bơ vơ cõi lòng.`
    },
    {
        title: "Nhà thơ ngốc",
        date: "2025-02-24",
        tags: ["love", "foolish"],
        preview: "Mình thật lòng thích người ta, / Câu này sáu chữ, sao mà buồn ghê.",
        content: `Mình thật lòng thích người ta,
Câu này sáu chữ, sao mà buồn ghê.
Nhà thơ đến tuổi diễn hề,
Chưa gì đã thích, đã mê thật lòng.

Mình thương mà chẳng dám mong,
Người ta đâu hiểu tấm lòng sắt son.
Tương tư trằn trọc, mỏi mòn,
Giật mình tỉnh giấc, người còn ở đây?

Ngỡ là mộng, hóa ra say.
Vui này nở mặt, buồn này giấu sao?
Hỏi nhà thơ nay thế nào,
Người đáp: “Tôi ổn, làm sao, đồ tồ!”

Thật lòng nhưng lại ngây ngô,
Mê người ta quá, khổ vô tận cùng.
Nhà thơ đâu phải kẻ khùng,
Bao nhiêu tình cảm, đem dùng vô thơ…

Như mọi khi,
Tìm em trong những giấc mơ,
Song song với đó là chờ đợi em.
Người cứ chống mặt lên xem
Nhà thơ ngốc nghếch sẽ đem nàng về`
    },
    {
        title: "Chỉ muốn được gặp em ngay",
        date: "2025-02-23",
        tags: ["love", "longing"],
        preview: "Chỉ muốn được gặp em ngay / Lò xo nén chặt lâu ngày bật tung...",
        content: `Chỉ mong được gặp em ngay,
Tương tư kìm nén bao ngày vỡ tung.
Nhớ thương đâu có tận cùng,
Trào dâng như sóng điệp trùng biển xa.

Tìm em giữa chốn bao la,
Mịt mù sương phủ nhạt nhoà bóng ai.
Thở dài đếm những sương mai, 
Trái tim trống rỗng u hoài đêm thâu.

Em giờ đang ở nơi đâu,
Để anh mãi ngóng, mãi sầu đêm nay.
Trăng buồn nhìn áng mây bay, 
Nhà thơ lặng lẽ hai tay ôm đàn.

Tìm em giữa chốn non ngàn,
Ngỡ đâu thấp thoáng trong làn sương rơi.
Bước chân lạc lõng chơi vơi,
Lang thang độc bóng giữa trời bao la.`
    },
    {
        title: "Mình nói chuyện lại được không",
        date: "2025-02-22",
        tags: ["love", "regret"],
        preview: "Mình nói chuyện lại được không / Vẫn gặp em trong giấc nồng hàng đêm...",
        content: `Mình nói chuyện lại được không
Vẫn gặp em trong giấc nồng hàng đêm
Tỉnh dậy chỉ thấy đau thêm
Đôi tay mới nắm vẫn mềm vẫn thon

Wish về lại thời trẻ con
Real life khắc nghiệt chẳng còn muốn chi
Miss em từ thuở biết đi
Last line không biết viết gì nên thôi`
    },
    {
        title: "Kỉ niệm về em màu xanh",
        date: "2025-02-21",
        tags: ["memory", "funny"],
        preview: "Kỉ niệm về em màu xanh / Một bát rau sống để dành cho em...",
        content: `Kỉ niệm về em màu xanh
Một bát rau sống để dành cho em
Nhìn rau em bảo em thèm
Bật cười em nói chắc em già rồi`
    },
    {
        title: "Vừa ăn vừa sợ tăng cân",
        date: "2025-02-20",
        tags: ["life", "food", "funny"],
        preview: "Vừa ăn vừa sợ tăng cân / Sợ ta béo quá chẳng cần ai ôm...",
        content: `Vừa ăn vừa sợ tăng cân
Sợ ta béo quá chẳng cần ai ôm
Thức ăn thì vẫn luôn mồm
Những gà những cá những tôm nạp vào

Sáng ra soi gương ngã nhào
Mặt tròn hơn cả bánh bao mẹ làm
Nhủ lòng sau này bớt ham
Nhưng mà xiên bẩn bác làm ngon ghê

Mùi vị cực kì u mê
Thôi ăn lần cuối thật phê một lần
Giảm cân để tính dần dần
Món này mà bỏ tội nhân muôn đời

Ăn xong trà sữa nốc chơi
Uống xong lại hứa mai bơi bù vào
Cân nặng nghịch với chiều cao
Thôi thì kệ xác, miễn sao yêu đời!`
    },
    {
        title: "Tự nhiên thấy thèm ly trà",
        date: "2025-02-19",
        tags: ["life", "reflection"],
        preview: "Tự nhiên thấy thèm ly trà / Bày đặt hãm nước xong pha thêm gừng...",
        content: `Tự nhiên thấy thèm ly trà
Bày đặt hãm nước xong pha thêm gừng
Nhớ về chuyện cũ rưng rưng
Nhấp môi vài ngụm cho ngừng mưa rơi

Ngoài hiên gió thoảng chơi vơi
Lòng như lá rụng giữa trời lặng thinh
Ngày xuân lủi thủi một mình
Hương trà thoang thoảng bóng hình người xưa`
    },
    {
        title: "Ly cà phê còn nửa tách",
        date: "2025-02-19",
        tags: ["life", "gaming"],
        preview: "Ly cà phê còn nửa tách / Đánh cờ thua sao lại trách do game...",
        content: `Ly cà phê còn nửa tách
Đánh cờ thua sao lại trách do game
Giá mà được gối đùi mềm
Nằm xem youtube luyện thêm nhiều bài`
    },
    {
        title: "Tối nào anh cũng về muộn",
        date: "2025-02-19",
        tags: ["life", "memory"],
        preview: "Tối nào anh cũng về muộn / Đêm nào anh cũng luôn luôn một mình...",
        content: `Tối nào anh cũng về muộn
Đêm nào anh cũng luôn luôn một mình
Sáng dậy căn nhà lặng thinh
Vươn vai mở mắt giật mình đã trưa

Xuân này đã khác xuân xưa
Ngủ đêm thì ít ngủ trưa thì nhiều
Kỉ niệm còn lại bao nhiêu
Cũng bay đi hết sớm chiều mất thôi

Dấu chân ai đã mờ rồi
Mùi thơm tóc gội bồi hồi chuyện xưa
Kỉ niệm như những hạt mưa
Đọng vương trên lá đong đưa dạt dào`
    },
    {
        title: "Học sinh mình cưng quá trời",
        date: "2025-02-19",
        tags: ["life", "teaching"],
        preview: "Học sinh mình cưng quá trời / Giờ học cứ nói cứ chơi kệ thầy...",
        content: `Học sinh mình cưng quá trời
Giờ học cứ nói cứ chơi kệ thầy
Học giỏi như tao đi bay
Tao cho nói chuyện cả ngày lẫn đêm`
    },
    {
        title: "Nắng mưa thì chẳng kéo dài",
        date: "2025-02-19",
        tags: ["love", "loneliness"],
        preview: "Nắng mưa thì chẳng kéo dài / Mà sao cứ nhớ em hoài chẳng quên...",
        content: `Nắng mưa thì chẳng kéo dài
Mà sao cứ nhớ em hoài chẳng quên
Đêm đông đầu gối thân mền
Dù lạnh hay ấm vẫn nên một mình`
    },
    {
        title: "Hôm qua tôi dạy em farm",
        date: "2025-02-18",
        tags: ["love", "gaming"],
        preview: "Hôm qua tôi dạy em farm / Hôm nay tôi dạy em làm nhà thơ...",
        content: `Hôm qua tôi dạy em farm
Hôm nay tôi dạy em làm nhà thơ
Ngày mai tôi dạy em cờ
Ngày sau tôi sẽ ngồi sờ má em`
    },
    {
        title: "Nhà thơ đi làm",
        date: "2025-02-17",
        tags: ["life", "work"],
        preview: "Lâu nay nhà thơ rảnh đời / Viết nhăng viết cuội chờ thời gian trôi...",
        content: `Lâu nay nhà thơ rảnh đời
Viết nhăng viết cuội chờ thời gian trôi
Cuối cùng cũng biết bận rồi
Muốn gặp em lắm nhưng thôi đi làm

Ngày qua cứ mãi tham lam
Bớt mơ mộng hão, bớt xàm xí đi
Để giờ hối hận chuyện gì
Buồn hoài cũng chán, ta đi làm bừa

Nhà thơ nay đã khác xưa
Bớt mơ mộng vì chẳng thừa thời gian
Lửa thiêng còn chút hơi tàn
Mây trôi sóng vỗ cũng tan giấc nồng

Bài thơ câu chữ mênh mông
Lo toan bận bịu chất chồng tháng năm
Ngâm thơ lẩm bẩm khi nằm
Mộng mơ một thuở trăm năm phiền đời

Bận mà ta vẫn thảnh thơi
Nhà thơ nửa muốn buông lơi, nửa làm
Dẫu cho công việc cầm giam
Vần thơ yêu dấu vẫn làm ta vui

Tình yêu càng tiến càng lùi
Vậy thôi ta đành thoái lui về nhà
Đơm hoá kết trái phương xa
Mong em hạnh phúc cho ta về tìm

Mây ngàn chẳng níu được chim
Sóng xô bờ cát lặng im không lời
Thơ còn một chút rong chơi
Giữa bao vội vã vẫn ngời sắc hương.`
    },
    {
        title: "Đêm nay sóng sánh men say",
        date: "2025-02-15",
        tags: ["loneliness", "sadness"],
        preview: "Đêm nay sóng sánh men say / Nhìn trăng ta thấy lòng đầy ngổn ngang...",
        content: `Đêm nay sóng sánh men say
Nhìn trăng ta thấy lòng đầy ngổn ngang
Cảnh sắc bỗng hoá hoang tàn
Sóng xô gió cuốn muôn ngàn âu lo
Đêm nay chỉ muốn chuyện trò
Người đi xa quá chẳng cho ta chờ
Chỉ gặp trong những giấc mơ
Người ta cự tuyệt, bây giờ ra sao?`
    },
    {
        title: "Cờ thủ nhân dân Nguyễn Tiến Anh",
        date: "2025-02-15",
        tags: ["gaming", "life"],
        preview: "Cờ thủ nhân dân Nguyễn Tiến Anh / Ngày đêm thức trắng để leo rank...",
        content: `Cờ thủ nhân dân Nguyễn Tiến Anh
Ngày đêm thức trắng để leo rank
Dành hơn ba tháng lên cao thủ
Hạnh phúc đắp chăn ngủ ngon lành`
    },
    {
        title: "Lâu lâu thấy ấn Gia Đình",
        date: "2025-02-11",
        tags: ["gaming", "funny"],
        preview: "Lâu lâu thấy ấn Gia Đình / Nhà thơ farm lính hết mình mà chơi...",
        content: `Lâu lâu thấy ấn Gia Đình
Nhà thơ farm lính hết mình mà chơi
Jinx 3 bay thẳng lên trời
Đáp tên lửa xuống lìa đời chuột con`
    },
    {
        title: "Món ăn và Nỗi nhớ",
        date: "2025-02-10",
        tags: ["food", "love", "sadness"],
        preview: "Hôm nay được đi ăn mì / Không ngon miệng lắm bởi vì nhớ ai...",
        content: `Mì:
Hôm nay được đi ăn mì
Không ngon miệng lắm bởi vì nhớ ai
Bữa ăn chan với bi hài
Nhớ ai da diết nên ngài ngâm thơ

Gà rán:
Hôm nay được đi ăn gà
Đồ ăn ngon lắm nhưng mà thiếu huofufh
Trời quang bỗng chợt tối sầm
Lòng tôi thoáng chốc lặng thầm tương tư

Pizza:
Hôm nay được ăn pizza
Cơm rau thịt cá kém xa món này
Thật ra tôi thà ăn chay
Sợ ăn nhiều quá chẳng may nhớ người

Phở:
Hôm nay được ăn phở bò
Tự dưng dậy sớm giở trò healthy
Chắc chắn là ngon hơn mì
Đang ăn lại nhớ em gì tên ghdyht

Bún:
Hôm nay được ăn bún riêu
Người rủ ăn bún rồi yêu đâu rồi
Nhà thơ ăn bún một hồi
Ăn nhưng bỏ bún để ngồi nghĩ thơ

Kem:
Hôm nay được đi ăn kem
Lạnh tan đầu lưỡi thòm thèm vị ai
Ngọt ngào đến mấy cũng phai
Ngày xuân lạnh lẽo bì hài nhà thơ

Bánh mì:
Hôm nay được ăn bánh mì
Giòn tan một miếng cần gì nhớ ai
Thịt chả rau dưa chưa xài
Bánh mì ngon quá nhớ ai bây giờ`
    },
    {
        title: "Say trong giấc mộng đêm đông",
        date: "2025-02-08",
        tags: ["love", "loneliness"],
        preview: "Say trong giấc mộng đêm đông / Đắp chăn ngủ nướng mặn nồng mình ta...",
        content: `Say trong giấc mộng đêm đông
Đắp chăn ngủ nướng mặn nồng mình ta
Chẳng đâu ấm áp bằng nhà
Chẳng đâu lạnh lẽo như là tim em💙`
    },
    {
        title: "Mỗi đêm là giấc mộng dài",
        date: "2025-02-04",
        tags: ["love", "sadness"],
        preview: "Mỗi đêm là giấc mộng dài / Tưởng quên rồi đấy bi hài tình yêu...",
        content: `Mỗi đêm là giấc mộng dài
Tưởng quên rồi đấy bi hài tình yêu
Thế nên chạ muốn ngủ nhiều
Mong chờ hạnh phúc là điều viển vông`
    },
    {
        title: "Mình nói chuyện lại được không",
        date: "2025-02-04",
        tags: ["love", "regret"],
        preview: "Mình nói chuyện lại được không / Nhưng mà tôi muốn làm chồng em cơ...",
        content: `Mình nói chuyện lại được không
Nhưng mà tôi muốn làm chồng em cơ
Em bảo tôi làm trong mơ
Tỉnh mơ buồn bã thẫn thờ nhớ em
Có muốn nhớ đến em đâu
Mà sao em cứ tạt đầu tim tôi
Thời gian đang ngày một trôi
Nhớ em muốn chết nhưng thôi chọn buồn
Tại sao mà cứ buồn hoài
Ba năm gói lại một vài câu thơ
Tìm em trong những giấc mơ
Lạc vào trong những đợi chờ nhớ thương`
    },
    {
        title: "Đêm nay bất hạnh vẫn còn dài",
        date: "2025-02-04",
        tags: ["sadness", "funny"],
        preview: "Đêm nay bất hạnh vẫn còn dài / Ngồi trên hố xí đợi ngày mai...",
        content: `Đêm nay bất hạnh vẫn còn dài
Ngồi trên hố xí đợi ngày mai
Ruột gan phô hết cho em thấy
Tim tôi em định bán cho ai`
    },
    {
        title: "Thực sự đã thấm mệt",
        date: "2025-01-18",
        tags: ["exhaustion"],
        preview: "Thực sự đã thấm mệt / Nhắm mắt ngủ k vào...",
        content: `Thực sự đã thấm mệt 
Nhắm mắt ngủ k vào
Trời thương cho con chết
Không ngủ thì sống sao`
    },
    {
        title: "Tụt xuống kim cương bốn",
        date: "2025-01-18",
        tags: ["gaming", "funny"],
        preview: "Tụt xuống kim cương bốn / Chán nản vãi cả nồn...",
        content: `Tụt xuống kim cương bốn
Chán nản vãi cả nồn
Chắc mình k trình độ
Chuyển sang pickleball`
    },
    {
        title: "Lướt Youtube lúc 4h sáng",
        date: "2025-01-18",
        tags: ["sadness", "life"],
        preview: "Lướt Youtube lúc 4h sáng / Thật buồn chán vì chẳng còn lại gì...",
        content: `Lướt Youtube lúc 4h sáng
Thật buồn chán vì chẳng còn lại gì
Tốc độ sản xuất video chậm hơn tốc độ chán
Nhà thơ không ngủ được vì nôn khan`
    },
    {
        title: "Còn lưu luyến chuyện từ năm qua",
        date: "2025-01-18",
        tags: ["love", "memory"],
        preview: "Còn lưu luyến chuyện từ năm qua / Tâm trí tôi được gửi đi bệnh viện...",
        content: `Còn lưu luyến chuyện từ năm qua
Tâm trí tôi được gửi đi bệnh viện
Lòng thầm ước em không xuất hiện
Nhưng có thì vui điên`
    },
    {
        title: "Đêm chơi cờ",
        date: "2025-01-11",
        tags: ["gaming", "funny", "love"],
        preview: "Trắng đen hay trắng đêm / Anh chẳng bớt hay thêm...",
        content: `Trắng đen hay trắng đêm
Anh chẳng bớt hay thêm
Ngày ngủ đủ 8 tiếng
Đêm gác chân gối mềm
Anh nằm nhưng chẳng ngủ
Giờ đấy phải đánh cờ!
Chơi cả ngày chẳng đủ
Đêm phải chơi tiếp cơ!!!
Cảnh binh rồi tái chế
Phù thuỷ rồi song hình
Đầu anh chỉ có thế
À còn có cả Linh
Linh ơi em đâu rồi
Mới 7 cảnh binh thôi
Anh mong Linh xuống núi
Địch cần bị đẩy lùi
À không chỉ mỗi Linh
Tớ cần cả cậu mà
Vừa quay đi quẩn lại
Vậy mà mình đã xa
Sáng sớm anh ngồi dậy
Mở máy anh lại vào
Sao game chán quá vậy
Do chơi cả đêm sao?
Chẳng nhẽ giờ ff
Thức cả đêm chơi rồi
Thêm cả game nó ép
Khéo ván này là trôi
Ôi nhưng thật tệ hại
Ra tất tay bậc đồng
Niềm vui đã trở lại
Mệt mỏi cất vào trong
Biết dù gì cũng cút 
Nhưng anh vẫn mỉm cười
Chơi lõi cưng một chút
Xíu ngủ mặt vẫn tươi
Chưa được nửa game đấu
Viết hẳn mười đoạn rồi
Đúng là game yêu dấu
Huỷ hoại đầu óc tôi🤣
Không Đo ni đóng giày
Vẫn ngáo ghép Xào đồ
Nhà thơ này quá cháy 
Cháy rực rừng lá khô
Kiểu này hỏng mất rồi
Xào đồ quá lung tung
Cụ lần này đi chắc
Top 4 khó hình dung
Đi chợ nhặt được xẻng
Ngỡ như nhặt được vàng
Nhưng không phải một xẻng
Hẳn 2 cái mới sang
Làm thơ cũng vào top
Trời đã về phe ta
Thương thì thương cho trót
Cho thầy xin top 3
Corki 2 không ra
Thôi cũng mãn nguyện rồi
Tất tay kích 9 hệ
Thế là top 3 thôi🤣
Cuối thơ không ai đọc
Chỉ muốn nói một điều
Tớ nhớ Bống ra phết🫵
Không chữ nào là điêu.`
    },
    {
        title: "Cậu dạo này thế nào?",
        date: "2025-01-09",
        tags: ["friendship", "memory"],
        preview: "Cậu dạo này thế nào? / Đêm có còn gật gù...",
        content: `Cậu dạo này thế nào?
Đêm có còn gật gù,
Ngày có còn vội vã?
Đông này, cậu sống sao?
Em dạo này thế nào?
Kiểm tra vở nó đi 📖.
Tớ mà gặp sẽ bảo:
“Nhóc phải nghe lời chị!” 👩‍🏫
Đừng thức nhiều quá chứ,
Tớ chẳng bận gì đâu.
Còn cậu bận nhiều thứ,
Phải nghiêm chỉnh từ đầu ⏳.
Cậu bảo ít ăn sáng,
Điêu thật, chẳng tin đâu! 
Tớ cũng nhịn ăn sáng,
Dạ dày tớ bạc màu 💔.
Cậu chơi game vui không?
Trò đó tớ nghỉ rồi 🎮.
Partner không phải Bống,
Game hoá nhạt, buông xuôi 😴.
Đánh cờ hay nhớ cậu,
Vì có Linh, có Vy.
Có Ven-đờ Lo-rít,
Cả Víc-to Chây-sì ✨.
Còn bóng đá thì sao?
Ngày mà mình còn chơi ⚽.
Cậu chỉ hứa sẽ vào,
Còn tớ chỉ biết đợi.
Chắc cậu ghét MU,
Hoặc cậu ghét thua cuộc.
Hoặc cậu ghét lũ ngu,
Cả ba cùng một giuộc.
Chắc ghét tớ lắm rồi,
Toàn thích gì làm nấy.
Ngoài trời mưa cứ rơi
Chán nản lắm đây này
Hay gọi cậu là vợ,
Nhưng lại làm cậu hờn 😅.
Thôi thì tớ hẹn vợ,
Khi khác tử tế hơn ❤️.`
    },
    {
        title: "Ngủ liền 12 tiếng",
        date: "2025-01-07",
        tags: ["sadness", "loneliness", "sleep"],
        preview: "Ngủ liền 12 tiếng / Em chán nản hoá điên...",
        content: `Ngủ liền 12 tiếng
Em chán nản hoá điên
Lúc chết báo 1 tiếng
Nhỡ k ai phát hiện
Ngủ liền cả nửa ngày
Ngủ qua cả hôm nay
Ngủ cho ngày mai nữa
Ngủ đến lúc chết này
Trời chiều nay đẹp quá
Mà mưa ở trong lòng
Chàng trai nhiều vướng bận
Giấu tất cả vào trong
Dạ dày chẳng biết đau
Bụng cũng chẳng đói mấy
Tim và em mất nhau
Hết lí do để dậy
Cho em ngủ tẹo nữa
Tỉnh dậy xem thế nào
Ngủ thêm vài năm nữa
Người đời họ nói sao
Trả lại em đi mà
Trả lại ngày xưa ấy
Thời ngủ gật trên giấy
Vui hơn sống thế này
Em sợ mình tỉnh táo
Đưa mình vào cơn say
Thà rằng là bị ngáo
Hơn tỉnh ở chốn này`
    },
    {
        title: "Nếu như Tanh đau khổ",
        date: "2025-01-06",
        tags: ["encouragement", "sadness"],
        preview: "Nếu như Tanh đau khổ / Đừng tự làm mình đau...",
        content: `Nếu như Tanh đau khổ
Đừng tự làm mình đau
Cơn đau khổ qua mau
Ngày mai trời lại sáng
Đừng gục ngã Tanh nhé
Mưa ngoài kia vẫn rơi
Còn cậu thì còn trẻ
Vẫn còn cả cuộc đời
Tanh dù không biết khóc
Thì vẫn thấy đau buồn
Bị mắng thì mới khóc
Chẳng ai đau khóc luôn
Đang viết thơ an ủi
Lại thành thơ buồn rùi
Chàng trai tự an ủi
Chẳng biết bao giờ vui🤣`
    },
    {
        title: "Trả lại hết cho tôi",
        date: "2025-01-06",
        tags: ["sadness", "despair"],
        preview: "Trả lại hết cho tôi / Không thì tôi reset...",
        content: `Trả lại hết cho tôi
Không thì tôi reset
Cuộc đời tôi nát bét
Sắp đổ gục xuống rồi
Nằm cuộn tròn trong chăn
Ước mình không tỉnh dậy
Chỉ cần ta kiên định
Hạnh phúc ngay ở đây
Trả lại tôi quá khứ
Trả Thảo Linh quay về
Trả cả Thạch Anh nữa
Trả lại em ngày xưa.
Tôi muốn chết muốn chết
Một cái chết màu hồng
Thử một lần mất hết
Để xem hối hận không
Tôi đã sai từng bước
Đi chệch cả đoạn đường
Đích không còn phía trước
Bất hạnh kiếm yêu thương
Chẳng còn lại gì cả
Một mình tôi cô đơn
Đánh mất đi tất cả
Chỉ còn lại căm hờn
Hãy cho tôi được chết
Ngủ thôi cũng đau lòng
Thân xác cũng đau nốt
Ngủ thôi cũng không xong
Cho tôi một điểm tựa
Cho tôi nơi dựa vào
Cho tôi lại cảm giác
Sống hạnh phúc ra sao`
    },
    {
        title: "Ngàn năm kết mộng tri ân",
        date: "2025-01-04",
        tags: ["love", "solitude"],
        preview: "Ngàn năm kết mộng tri ân, / Giai tân đi với mỹ nhân chơi cờ...",
        content: `Ngàn năm kết mộng tri ân,
Giai tân đi với mỹ nhân chơi cờ.
Vậy còn Abyss nhà thơ,
Vạn năm lẻ bóng bao giờ biết yêu?

Trăng khuya nghiêng bóng tịch liêu,
Hồn thơ giăng lối những chiều phôi pha.
Tìm đâu ánh mắt chan hòa,
Để câu thơ thắm như hoa giữa trời.`
    },
    {
        title: "Trời mưa nên không có em",
        date: "2024-12-09",
        tags: ["love", "rain", "sadness"],
        preview: "Trời mưa nên không có em / Là ngày thiếu nắng, buồn tênh lặng thầm...",
        content: `Trời mưa nên không có em 
Là ngày thiếu nắng, buồn tênh lặng thầm
Anh ngồi đợi gió ghé thăm
Mong mưa mau ngớt, để dầm nắng đông`
    },
    {
        title: "Ngập lụt",
        date: "2024-08-14",
        tags: ["life", "funny", "love"],
        preview: "Trang khoe Trang đỗ visa / Tôi khoe nước ngập ngã ba Hải Xồm...",
        content: `Trang khoe Trang đỗ visa
Tôi khoe nước ngập ngã ba Hải Xồm
Ở đây thoát nước lôm côm
Ô tô xe máy phải chôm vỉa hè
Vỉa hè thành chỗ đỗ xe 
Phóng xe lên cất gọi Be đèo về
Thời tiết giống như chú hề
Sáng thì nắng gắt đêm về bão giông
Ngày mai rồi biến thành sông
Ta đành hoan hỉ sông Hồng thứ hai
Bão giông thì chẳng kéo dài
Mà sao cứ nhớ em hoài chẳng quên
Nhớ mà ngủ cũng gọi tên
Tê e rờ ớ xong thêm chữ mờ
Ngập lụt cũng viết ra thơ
Nhà thơ farm lính đợi chờ tình yêu`
    },
    {
        title: "Vô ngủ",
        date: "2024-08-06",
        tags: ["funny", "life", "love", "sadness"],
        preview: "Người thường thì ngủ từ khuya / Bất thường thì ngủ đến khuya từ chiều...",
        content: `Người thường thì ngủ từ khuya
Bất thường thì ngủ đến khuya từ chiều
Sức tôi không thể ngủ nhiều
Thế mà lại ngủ từ chiều tới khuya
Nhân một đêm đầy sao
Nỗi buồn lén lút sang
Ngủ thì ngủ đéo vào
Thức con mẹ đến sáng 

Cao cao ngọn núi
Vũ môn vượt dòng
Ngọc cất trong túi
Trâm vào ngay mông 

Thà rằng cứ quên đi tất cả
Nhớ nhiều quá hành hạ lòng mình
Chẳng nhẽ sống chưa đủ vất vả
Mà vẫn còn thấy cô ấy xinh 

Cơm ăn một bát đã đủ no
Có phải dạ dày rất ki bo?
Chẳng bù cho tim mình hào phóng
Dành hết tình yêu cho em mò

Chẳng biết thì khi nào tôi chết
Mong rằng nó sẽ đến thật êm
Bao nhiêu tình cảm tôi trao hết
Giữ lại cho mình ánh sao đêm 

Tất cả là cú lừa thôi
Tôi không chịu ngủ vì ngồi xem phim
Chứ không phải vì trái tim
Nhớ thương em quá nên tìm cơn say`
    },
    {
        title: "Ngọc trong dòng nước mát xanh",
        date: "2024-07-14",
        tags: ["love"],
        preview: "Ngọc trong dòng nước mát xanh / Ngọc trong đôi mắt Tanh dành cho Trâm...",
        content: `Ngọc trong dòng nước mát xanh
Ngọc trong đôi mắt Tanh dành cho Trâm`
    },
    {
        title: "Đang vui thì đứt dây đàn",
        date: "2024-07-12",
        tags: ["sadness", "love"],
        preview: "Đang vui thì đứt dây đàn / Đang buôn ríu rít thì nàng rời đi...",
        content: `Đang vui thì đứt dây đàn
Đang buôn ríu rít thì nàng rời đi
Lửa tình nàng cũng mang đi
Chàng trai ở lại lấy gì tương tư`
    },
    {
        title: "Bất bình với một cuộc sống",
        date: "2024-07-07",
        tags: ["life", "funny"],
        preview: "Bất bình với một cuộc sống bình thường / Tôi thà đi hóng chuyện ở Bình Dương...",
        content: `Bất bình với một cuộc sống bình thường
Tôi thà đi hóng chuyện ở Bình Dương
Thà tí tởn nhắn tin với gái lạ
Còn hơn phải sống qua ngày chán chường.`
    },
    {
        title: "Lúc rảnh thì anh bị vô tri",
        date: "2024-07-07",
        tags: ["life", "work"],
        preview: "Lúc rảnh thì anh bị vô tri / Lúc bận thì không chơi được rồi...",
        content: `Lúc rảnh thì anh bị vô tri
Lúc bận thì không chơi được rồi
Lúc làm thì anh làm không nghỉ
Lúc rảnh thì chán chết đi thôi...`
    },
    {
        title: "Cờ đỏ",
        date: "2024-06-18",
        tags: ["funny", "love"],
        preview: "được gọi là cờ đỏ / thật hạnh phúc biết bao...",
        content: `được gọi là cờ đỏ
thật hạnh phúc biết bao
một chàng trai cờ đỏ
cô ấy né thế nào`
    },
    {
        title: "Ôi quả mận",
        date: "2024-06-07",
        tags: ["food", "love", "funny"],
        preview: "Ôi quả mận chín mịa mất rồi / Ăn vào ngọt chết mịa đi thôi...",
        content: `Ôi quả mận chín mịa mất rồi
Ăn vào ngọt chết mịa đi thôi
Nói thích Ngọt là lời nói dối
Nói thích em là lời đầu môi`
    },
    {
        title: "Mai nay ông đi",
        date: "2024-05-12",
        tags: ["life", "farewell"],
        preview: "Mai nay ông đi theo bà ấy / Lạc vào rừng đầy nắng với cây...",
        content: `Mai nay ông đi theo bà ấy
Lạc vào rừng đầy nắng với cây
Ông cứ rảo bước đi như vậy 
Không ai biết cũng chẳng ai hay.`
    },
    {
        title: "Tớ nhớ rằng, ngày ấy",
        date: "2024-01-24",
        tags: ["memory", "school", "love"],
        preview: "Tớ ước rằng, ngày ấy... / Tớ nhớ rằng, ngày ấy...",
        content: `Tớ ước rằng, ngày ấy...
Tớ nhớ rằng, ngày ấy
Một chiều thu tháng mười
Tớ thì sắp mười bảy
Chưa được ai nắm tay
Tớ nhớ rằng, ngày ấy
Đôi mắt nhìn tớ tròn
Mái tóc dài đen láy
Tính cách như trẻ con
Tớ nhớ rằng, ngày ấy
Cạnh tớ có cậu ngồi
Cậu chỉ ngồi 1 lúc
Tim tớ đổ mồ hôi.
Tớ nhớ rằng ngày ấy
Cậu nghịch mái tóc tớ 
“Đồ con trai tóc ngắn”
“Nghịch làm quái gì nhở?”
Tớ nhớ rằng ngày ấy
Tớ thật lòng mở lời
Thế là cậu lạnh nhạt
Rồi xong cậu nghỉ chơi.
Tớ mơ rằng ngày ấy
Đi học về cùng cậu
Lén giấu đi hạnh phúc
Tỉnh dậy chẳng thấy đâu.
Tớ mơ rằng ngày ấy
Vào một buổi chiều hè
Ở phía sau là cậu
Còn tớ thì lái xe.
Tớ thề rằng nếu được
Mong gặp cậu kiếp sau
Hoặc thời gian tua ngược
Để tìm lại phút đầu.`
    },
    {
        title: "Tớ mơ rằng ngày đó",
        date: "2024-01-19",
        tags: ["dream", "love"],
        preview: "Tớ mơ rằng ngày đó / Được sánh bước bên cậu...",
        content: `Tớ mơ rằng ngày đó
Được sánh bước bên cậu
Lén giấu đi hạnh phúc
Tỉnh dậy chẳng thấy đâu.`
    },
    {
        title: "Tuổi hai mươi lang thang",
        date: "2024-01-17",
        tags: ["life", "love"],
        preview: "Tuổi hai mươi gì mà kì quá / Lang thang đi dưới cơn mưa lạnh...",
        content: `Tuổi hai mươi gì mà kì quá
Lang thang đi dưới cơn mưa lạnh
Một mình tớ ngao du trăm ngả
Nhưng mà tụi mình không cách xa`
    },
    {
        title: "Sướng nhất là nửa đêm ăn cóc",
        date: "2023-12-11",
        tags: ["food", "funny", "life"],
        preview: "Sướng nhất là nửa đêm ăn cóc / Hộp cóc chua tôi tự đi mua...",
        content: `Sướng nhất là nửa đêm ăn cóc
Hộp cóc chua tôi tự đi mua
Cóc lắc kĩ muối mặn đường ngọt
Dạ dày đau mà miệng sướng hơn vua.`
    },
    {
        title: "Dặn lòng rằng đây là lần cuối",
        date: "2023-12-04",
        tags: ["funny", "life"],
        preview: "Dặn lòng rằng đây là lần cuối / Mà cứ lỡ tay tiêu rồi xài...",
        content: `Dặn lòng rằng đây là lần cuối
Mà cứ lỡ tay tiêu rồi xài
Sức khỏe thì càng ngày càng đuối
Nhà thơ chắc không còn ngày mai`
    },
    {
        title: "Nửa đêm không ngủ",
        date: "2023-12-02",
        tags: ["funny", "reflection"],
        preview: "Nửa đêm không ngủ là ngốc nghếch / Em tưởng mình hiểu hết cuộc đời...",
        content: `Nửa đêm không ngủ là ngốc nghếch
Em tưởng mình hiểu hết cuộc đời
Giống như dưới giếng có con ếch
Tưởng khôn mà lại hóa dở hơi.`
    },
    {
        title: "Nhà thơ farm lính",
        date: "2023-12-02",
        tags: ["writing"],
        preview: "Vương trong đôi mắt em một chút / Là giọt long lanh như sương mai...",
        content: `Vương trong đôi mắt em một chút
Là giọt long lanh như sương mai
Nhà thơ farm lính lại cầm bút
Khi ông cảm thấy cần viết bài.`
    },
    {
        title: "Hôm nay John lạc mất rồi",
        date: "2023-12-02",
        tags: ["sadness"],
        preview: "Hôm nay John lạc mất rồi! / Nhìn quanh chẳng thấy mảnh đồi thường qua...",
        content: `Hôm nay John lạc mất rồi!
Nhìn quanh chẳng thấy mảnh đồi thường qua
Nơi đây chỉ toàn là hoa
Vài ba tiếng khóc nơi xa vọng về.`
    },
    {
        title: "Tuổi hai mươi kì quá",
        date: "2023-11-12",
        tags: ["life", "love"],
        preview: "Tuổi hai mươi gì mà kì quá / Chẳng tìm ra ánh mắt giống em...",
        content: `Tuổi hai mươi gì mà kì quá
Chẳng tìm ra ánh mắt giống em
Rồi sao được vuốt ve gò má
Và thơm lên một đôi môi mềm.`
    },
    {
        title: "Lửa cháy trong tim",
        date: "2023-11-12",
        tags: ["love", "youth"],
        preview: "Lửa cháy trong tim vào đầu đông / Mười tám đôi mươi một màu hồng...",
        content: `Lửa cháy trong tim vào đầu đông
Mười tám đôi mươi một màu hồng.
Yêu em anh sống trong ngang trái 
Yêu anh thì lên xe anh lai.`
    },
    {
        title: "Ngoại lệ của anh",
        date: "2023-11-09",
        tags: ["love", "food"],
        preview: "Em là ngoại lệ của anh / Chẳng ai hai rưỡi lại canh rời nhà...",
        content: `Em là ngoại lệ của anh
Chẳng ai hai rưỡi lại canh rời nhà
Đi mua bánh tráng phố xa
Mang cho cô gái người mà anh thương.`
    },
    {
        title: "Tao đi mid",
        date: "2023-11-09",
        tags: ["gaming", "funny"],
        preview: "Tao đi mid toàn full sách / Mày bị hành xong đi mách mẹ cha...",
        content: `Tao đi mid toàn full sách
Mày bị hành xong đi mách mẹ cha
Cái thằng tiền kiếm chưa ra
Farm xe hụt hết làm ba mẹ buồn`
    },
    {
        title: "Kìa, em thấy gì trong đôi mắt",
        date: "2023-11-03",
        tags: ["love", "funny"],
        preview: "Kìa, em thấy gì trong đôi mắt / À, em đang ngắm một bầu trời sao...",
        content: `Kìa, em thấy gì trong đôi mắt
À, em đang ngắm một bầu trời sao.
Vậy, chắc em nên đi nhỏ mắt
Bởi, toàn mây nắng chứ làm gì có sao nào?`
    },
    {
        title: "Đừng cố bên nhau",
        date: "2023-11-01",
        tags: ["love", "farewell"],
        preview: "Nàng ơi đừng cố bên nhau / Nếu số đã định thì mau ra về...",
        content: `Nàng ơi đừng cố bên nhau
Nếu số đã định thì mau ra về.
Đừng níu đừng giữ lê thê
Có duyên mình sẽ đuề huề sớm mai.`
    },
    {
        title: "Anh đây mới 6 tuổi thôi",
        date: "2023-10-18",
        tags: ["love", "funny"],
        preview: "Anh đây mới 6 tuổi thôi / Cộng xong phép toán lại ngồi nhớ Linh...",
        content: `Anh đây mới 6 tuổi thôi
Cộng xong phép toán lại ngồi nhớ Linh
Nhỏ con ngồi viết thơ tình
Văn hay nhưng chẳng đủ trình bên em.`
    },
    {
        title: "Vì nàng là nhất trên đời",
        date: "2023-10-18",
        tags: ["love", "writing"],
        preview: "Vì nàng là nhất trên đời / Nên anh không muốn mình rời xa nhau...",
        content: `Vì nàng là nhất trên đời
Nên anh không muốn mình rời xa nhau.
Anh thề anh chẳng điêu đâu
Hàng đêm anh vẫn ngồi lâu chờ nàng.
Phiền lòng nên anh đành mang
Bao nhiêu suy nghĩ gửi vào văn thơ
Du hành trong những giấc mơ
Biết bao hạnh phúc trông chờ vào em.`
    },
    {
        title: "Hôm nay tôi dạy em farm",
        date: "2023-10-16",
        tags: ["gaming", "love"],
        preview: "Hôm nay tôi dạy em farm / Ngày mai tôi dạy em làm nhà thơ...",
        content: `Hôm nay tôi dạy em farm
Ngày mai tôi dạy em làm nhà thơ
Du hành trong những cơn mơ
Song song với đó là chờ đợi em.`
    }
];

// Automatically inject a default curator's note for any poem that doesn't have one
const insightTemplates = [
    "Bút ký: Bài thơ này được viết ra trong một đêm trằn trọc, như một lời tự sự mộc mạc gửi lại cho chính mình của ngày mai.",
    "Bút ký: Một góc nhìn trầm ngâm về sự trôi chảy của thời gian, nơi quá khứ và hiện tại giao thoa qua từng vần điệu.",
    "Bút ký: Cảm hứng đến từ những sự việc rất đỗi bình thường, biến cái tẻ nhạt của cuộc đời thành những vần thơ đầy ngẫm nghĩ.",
    "Bút ký: Những con chữ là cách duy nhất để tác giả đối thoại thẳng thắn với sự xáo động sâu thẳm bên trong tâm hồn.",
    "Bút ký: Tác phẩm mang một chút vị đắng của sự hoài niệm, gửi gắm những tâm tư chưa bao giờ dám nói thành lời.",
    "Bút ký: Viết trong một ngày tâm trí kiệt sức. Lời thơ là tiếng thở dài vừa bất lực lại vừa đầy tính tự trào về cuộc sống người trưởng thành.",
    "Bút ký: Một khoảnh khắc đứng chững lại giữa dòng đời hối hả, nhìn lại chặng đường tuổi trẻ với vô vàn những ngây ngô và tiếc nuối.",
    "Bút ký: Bóng tối và sự tĩnh lặng đã tạo nên bức nền hoàn hảo cho những cảm xúc dồn nén được giải phóng qua từng dòng chữ thơ này.",
    "Bút ký: Ra đời từ một cơn mưa rào bất chợt, bài thơ mang vệt nước lấp lánh của những kỷ niệm buồn nhưng tĩnh lặng và êm đềm.",
    "Bút ký: Khúc ca về sự cô đơn không phải để bi lụy, mà khao khát được thấu hiểu. Giọng thơ có chút ngạo nghễ nhưng bên trong lại đầy chơi vơi."
];

poems.forEach((p, index) => {
    if (!p.insight) {
        // Create a pseudo-random seed consistently based on the poem's title
        const charCodeSum = p.title.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const templateIndex = (charCodeSum + index) % insightTemplates.length;
        p.insight = insightTemplates[templateIndex];
    }
});

// ---- AUTO ID GENERATION ----
// Tự động gán ID dựa trên thứ tự. Bài cũ nhất (cuối mảng) sẽ là p1, bài mới nhất (đầu mảng) là pN.
poems = poems.map((poem, index) => ({
    ...poem,
    id: "p" + (poems.length - index)
}));
