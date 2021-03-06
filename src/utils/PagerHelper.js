﻿function PagerHelper(num_display_entries, num_edge_entries) {
    this.num_display_entries = num_display_entries || 6;
    this.num_edge_entries = num_edge_entries || 2;
};

/**
* Calculate start and end point of pagination links depending on
* currentPage and num_display_entries.
* @return {Array}
*/
PagerHelper.prototype.getInterval = function (currentPage, pageCount) {
    var ne_half = Math.ceil(this.num_display_entries / 2);
    var np = pageCount;
    var upper_limit = np - this.num_display_entries;
    var start = currentPage > ne_half ? Math.max(Math.min(currentPage - ne_half, upper_limit), 0) : 0;
    var end = currentPage > ne_half ? Math.min(currentPage + ne_half, np) : Math.min(this.num_display_entries, np);
    return [start, end];
};

PagerHelper.prototype.getPages = function (currentPage, totalPages) {
    var ret = [];
    var num_edge_entries = this.num_edge_entries;
    var np = totalPages;
    var interval = this.getInterval(currentPage - 1, totalPages);

    // Generate starting points
    if (interval[0] > 0 && num_edge_entries > 0) {
        var end = Math.min(num_edge_entries, interval[0]);
        for (var i = 0; i < end; i++) {
            var page = makePage(i + 1, i + 1, (i + 1) === currentPage);
            ret.push(page);
        }
        if (num_edge_entries < interval[0]) {
            var page = makePage(-1, '...', false);
            ret.push(page);
        }
    }
    // Generate interval links
    for (var i = interval[0]; i < interval[1]; i++) {
        var page = makePage(i + 1, i + 1, (i + 1) === currentPage);
        ret.push(page);
    }
    // Generate ending points
    if (interval[1] < np && num_edge_entries > 0) {
        if (np - num_edge_entries > interval[1]) {
            var page = makePage(-1, '...', false);
            ret.push(page);
        }
        var begin = Math.max(np - num_edge_entries, interval[1]);
        for (var i = begin; i < np; i++) {
            var page = makePage(i + 1, i + 1, (i + 1) === currentPage);
            ret.push(page);
        }
    }

    return ret;
};

// Create page object used in template
function makePage(number, text, isActive) {
    return {
        number: number,
        text: text,
        active: isActive,
        disabled: text == '...',
    };
}

module.exports = PagerHelper;