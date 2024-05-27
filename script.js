// Existing JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'AIzaSyBLtNGJWKEAQDnponXmIhX2lkWIj4uRPtA';
    const channelIds = ['UCLQljmEMQmfPUwH6ZpV1Rtw', 'UCVRr7P3pGpvXRCDo2MULRCQ'];
    const subCountElements = [document.getElementById('subCount1'), document.getElementById('subCount2')];

    function updateSubCount(index, count) {
        subCountElements[index].textContent = count;
        if (count % 100 === 0 && count !== 0) {
            alert(`Congratulations! ${channelIds[index]} has reached ${count} subscribers!`);
        }
    }

    function fetchSubCount(index) {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds[index]}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items[0].statistics) {
                    updateSubCount(index, parseInt(data.items[0].statistics.subscriberCount));
                } else {
                    subCountElements[index].textContent = 'Error fetching data';
                }
            })
            .catch(error => {
                subCountElements[index].textContent = 'Error fetching data';
            });
    }

    channelIds.forEach((id, index) => {
        fetchSubCount(index);
    });
});

// JavaScript for the download button
document.getElementById('downloadButton').addEventListener('click', function() {
    var link = document.createElement('a');
    link.href = 'fileLink.html';
    link.download = 'ChannelSubscriberTracker';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
